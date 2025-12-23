import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import yaml from "js-yaml";
import SwaggerUI from "swagger-ui-react";
import { RedocStandalone } from "redoc";
import "swagger-ui-react/swagger-ui.css";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowLeft,
  Search,
  Copy,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Download,
  Maximize2,
  Minimize2,
} from "lucide-react";
import "./ApiDocDetail.scss";

// API collections metadata with YAML file paths
const apiCollectionsMetadata: Record<string, { yamlPath?: string }> = {
  "1": {
    yamlPath: "/api-specs/grm-api.yaml"
  },
  "2": {
    yamlPath: "/api-specs/sample-api.yaml"
  }
};

export default function ApiDocDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [apiDoc, setApiDoc] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string>("");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [expandedResponses, setExpandedResponses] = useState<Record<string, boolean>>({});

  // New state for Swagger/Redoc integration
  const [yamlUrl, setYamlUrl] = useState<string>("");
  const [apiMetadata, setApiMetadata] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("swagger");
  const [isYamlLoading, setIsYamlLoading] = useState(true);


  useEffect(() => {
    const loadApiDoc = async () => {
      setIsLoading(true);
      const metadata = apiCollectionsMetadata[id as string];

      if (metadata?.yamlPath) {
        try {
          setIsYamlLoading(true);
          // Construct the full URL for the YAML file
          const fullUrl = window.location.origin + metadata.yamlPath;
          setYamlUrl(fullUrl);
          setApiMetadata(metadata);
          
          // Fetch the YAML file
          const response = await fetch(metadata.yamlPath, {
            headers: {
              'Accept': 'text/yaml, application/x-yaml, text/plain'
            }
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch YAML file: ${response.status} ${response.statusText}`);
          }
          
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('text/html')) {
            throw new Error('Received HTML instead of YAML. The YAML file might not be accessible on the server.');
          }
          
          const yamlText = await response.text();
          
          if (yamlText.trim().startsWith('<!DOCTYPE') || yamlText.trim().startsWith('<html')) {
            console.error("Received HTML instead of YAML. File path may be incorrect:", metadata.yamlPath);
            throw new Error(`Failed to load YAML file. The file at ${metadata.yamlPath} could not be found or is not accessible.`);
          }
          
          let parsedYaml: any;
          try {
            parsedYaml = yaml.load(yamlText, { 
              json: true,
              onWarning: (warning) => {
                console.warn("YAML warning:", warning);
              }
            });
          } catch (yamlError: any) {
            console.error("YAML parsing error:", yamlError);
            throw new Error(`Invalid YAML format: ${yamlError.message || 'Unknown error'}`);
          }

          if (!parsedYaml || typeof parsedYaml !== 'object') {
            throw new Error("Invalid YAML structure - not a valid object");
          }

          if (!parsedYaml.paths) {
            throw new Error("Invalid YAML structure - missing paths");
          }

          // Group endpoints by tags
          const groupedEndpoints: Record<string, any[]> = {};
          
          Object.entries(parsedYaml.paths || {}).forEach(([path, methods]: [string, any]) => {
            Object.entries(methods)
              .filter(([method]) => ['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase()))
              .forEach(([method, details]: [string, any]) => {
                const responses: any = {};
                
                Object.entries(details.responses || {}).forEach(([code, responseData]: [string, any]) => {
                  let exampleValue: any = null;
                  
                  if (responseData.content?.["application/json"]?.examples) {
                    const examplesObj = responseData.content["application/json"].examples;
                    const firstExampleKey = Object.keys(examplesObj)[0];
                    if (firstExampleKey && examplesObj[firstExampleKey]?.value) {
                      exampleValue = examplesObj[firstExampleKey].value;
                    }
                  } else if (responseData.content?.["application/json"]?.example) {
                    exampleValue = responseData.content["application/json"].example;
                  } else if (responseData.content?.["application/json"]?.schema?.example) {
                    exampleValue = responseData.content["application/json"].schema.example;
                  }
                  
                  responses[code] = {
                    description: responseData.description || `Response ${code}`,
                    example: exampleValue ? JSON.stringify(exampleValue, null, 2) : null,
                    schema: responseData.content?.["application/json"]?.schema
                  };
                });

                let requestExample = null;
                if (details.requestBody?.content?.["application/json"]?.schema) {
                  const schema = details.requestBody.content["application/json"].schema;
                  if (schema.example) {
                    requestExample = JSON.stringify(schema.example, null, 2);
                  }
                }

                const parameters = (details.parameters || []).map((param: any) => ({
                  name: param.name,
                  in: param.in,
                  required: param.required || false,
                  type: param.schema?.type || 'string',
                  description: param.description || ''
                }));

                const endpoint = {
                  id: details.operationId || `${method}-${path.replace(/\//g, '-')}`,
                  name: details.summary || `${method.toUpperCase()} ${path}`,
                  method: method.toUpperCase(),
                  path: path,
                  description: details.description || details.summary || '',
                  tags: details.tags || ['Other'],
                  parameters,
                  requestBody: requestExample,
                  responses
                };

                const tag = (details.tags && details.tags[0]) || 'Other';
                if (!groupedEndpoints[tag]) {
                  groupedEndpoints[tag] = [];
                }
                groupedEndpoints[tag].push(endpoint);
              });
          });

          setApiDoc({
            id: id,
            name: parsedYaml.info?.title || "API Documentation",
            version: parsedYaml.info?.version || "1.0.0",
            status: "active",
            description: parsedYaml.info?.description || parsedYaml.info?.title || "",
            baseUrl: parsedYaml.servers?.[0]?.url || "https://api.example.com",
            createdBy: "administrator",
            createdDate: "Jul 23, 2025, 20:14",
            groupedEndpoints
          });

          // Set initial expanded groups and select first endpoint
          const firstGroup = Object.keys(groupedEndpoints)[0];
          if (firstGroup) {
            setExpandedGroups([firstGroup]);
            const firstEndpoint = groupedEndpoints[firstGroup][0];
            if (firstEndpoint) {
              setSelectedEndpoint(firstEndpoint.id);
            }
          }
          setIsYamlLoading(false);
        } catch (error) {
          console.error("Error loading YAML:", error);
          setApiDoc(null);
          setApiMetadata(null); // Also clear metadata if YAML loading fails
          setYamlUrl(""); // Clear URL as well
          setIsYamlLoading(false);
        }
      } else {
        console.error("No YAML path configured for this API");
        setApiDoc(null);
        setApiMetadata(null);
        setYamlUrl("");
        setIsYamlLoading(false);
      }

      setIsLoading(false);
    };

    loadApiDoc();
  }, [id]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    );
  };

  const toggleExpandAll = (responseCode: string) => {
    setExpandedResponses(prev => ({
      ...prev,
      [responseCode]: !prev[responseCode]
    }));
  };
  
  // New handler for downloading the YAML file
  const handleDownload = () => {
    if (yamlUrl) {
      window.open(yamlUrl, '_blank');
    }
  };


  if (isLoading) {
    return (
      <AppLayout title="API Documentation" subtitle="Loading...">
        <div className="cls-apidoc-detail-container">
          <Card>
            <CardContent className="p-6">
              <p>Loading API documentation...</p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  if (!apiMetadata && !isLoading) { // Changed condition to check apiMetadata
    return (
      <AppLayout title="API Documentation" subtitle="API document not found">
        <div className="cls-apidoc-detail-container">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-red-600 font-semibold">API documentation could not be loaded.</p>
                <p className="text-sm text-gray-600">
                  The YAML specification file may be invalid or missing. Please check the console for detailed error messages.
                </p>
                <Button onClick={() => setLocation("/api-docs")} className="mt-4">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to API Collections
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // The following code for rendering the old UI is now commented out or removed
  // as the new Swagger UI and Redoc components will be used.

  // Get all endpoints flattened
  const allEndpoints = Object.values(apiDoc.groupedEndpoints).flat();
  const currentEndpoint: any = allEndpoints.find((e: any) => e.id === selectedEndpoint) || allEndpoints[0];

  // Filter endpoints based on search
  const filteredGroups = Object.entries(apiDoc.groupedEndpoints).reduce((acc, [tag, endpoints]: [string, any]) => {
    const filtered = endpoints.filter((endpoint: any) =>
      endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.path.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[tag] = filtered;
    }
    return acc;
  }, {} as Record<string, any[]>);


  return (
    <AppLayout title={apiMetadata.name} subtitle={apiMetadata.description}>
      <div className="cls-apidoc-detail-container">
        {/* Header with Back Button */}
        <div className="cls-doc-header-nav">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/api-docs")}
            className="cls-back-button"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>

        {/* Basic Information Section */}
        {/* <Card className="cls-basic-info-card">
          <CardContent className="cls-basic-info-content">
            <div className="cls-basic-info-header">
              <div className="cls-basic-info-title-row">
                {JSON.stringify(apiMetadata)}
                <h1 className="cls-basic-info-title">{apiMetadata.name}</h1>
                <div className="cls-basic-info-badges">
                  <Badge className="cls-version-badge">v{apiMetadata.version}</Badge>
                  <Badge className="cls-status-badge-active">active</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="cls-download-button" onClick={handleDownload}>
                <Download size={16} />
                Download
              </Button>
            </div>
            
            <p className="cls-basic-info-description">{apiMetadata.description}</p>
            
            <div className="cls-basic-info-meta">
              <div className="cls-meta-item">
                <span className="cls-meta-label">Created by</span>
                <span className="cls-meta-value">admin@sage.co</span> 
              </div>
              <div className="cls-meta-item">
                <span className="cls-meta-label">Created</span>
                <span className="cls-meta-value">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> 
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* API Documentation Viewer */}
        <Card className="cls-api-viewer-card">
          <CardContent className="cls-api-viewer-content">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="cls-viewer-tabs">
              <div className="flex p-2">
              <TabsList className="cls-viewer-tabs-list">
                <TabsTrigger value="swagger" className="cls-viewer-tab">
                  Swagger UI
                </TabsTrigger>
                <TabsTrigger value="redoc" className="cls-viewer-tab">
                  Redoc
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm" className="cls-download-button" onClick={handleDownload}>
                <Download size={16} />
                Download
              </Button>
              </div>


              <TabsContent value="swagger" className="cls-viewer-tab-content">
                <div className="cls-swagger-container">
                  {isYamlLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                  ) : yamlUrl ? (
                    <SwaggerUI
                      url={yamlUrl}
                      docExpansion="list"
                      defaultModelsExpandDepth={1}
                      defaultModelExpandDepth={1}
                      displayRequestDuration={true}
                      filter={true}
                      showExtensions={true}
                      showCommonExtensions={true}
                      tryItOutEnabled={true}
                    />
                  ) : null}
                </div>
              </TabsContent>

              <TabsContent value="redoc" className="cls-viewer-tab-content">
                <div className="cls-redoc-container">
                  {isYamlLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                  ) : yamlUrl ? (
                    <RedocStandalone
                      specUrl={yamlUrl}
                      options={{
                        nativeScrollbars: true,
                        theme: {
                          colors: {
                            primary: {
                              main: '#7c3aed' // Example color
                            }
                          },
                          typography: {
                            fontSize: '14px',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }
                        },
                        hideDownloadButton: false,
                        expandResponses: "200,201",
                        jsonSampleExpandLevel: 2,
                        menuToggle: true,
                        sortPropsAlphabetically: true,
                        hideLoading: false
                      }}
                    />
                  ) : null}
                </div>
              </TabsContent>
            </Tabs>
            
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}