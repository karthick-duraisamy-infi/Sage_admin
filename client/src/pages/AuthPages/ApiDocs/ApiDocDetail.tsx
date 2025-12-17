
import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import yaml from "js-yaml";
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

  useEffect(() => {
    const loadApiDoc = async () => {
      setIsLoading(true);
      const metadata = apiCollectionsMetadata[id as string];

      if (metadata?.yamlPath) {
        try {
          const response = await fetch(metadata.yamlPath);
          if (!response.ok) {
            throw new Error(`Failed to fetch YAML file: ${response.statusText}`);
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
        } catch (error) {
          console.error("Error loading YAML:", error);
          setApiDoc(null);
        }
      } else {
        console.error("No YAML path configured for this API");
        setApiDoc(null);
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

  if (!apiDoc && !isLoading) {
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
    <AppLayout title={apiDoc.name} subtitle={apiDoc.description}>
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
        <Card className="cls-basic-info-card">
          <CardContent className="cls-basic-info-content">
            <div className="cls-basic-info-header">
              <div className="cls-basic-info-title-row">
                <h1 className="cls-basic-info-title">{apiDoc.name}</h1>
                <div className="cls-basic-info-badges">
                  <Badge className="cls-version-badge">v{apiDoc.version}</Badge>
                  <Badge className="cls-status-badge-active">{apiDoc.status}</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="cls-download-button">
                <Download size={16} />
                Download
              </Button>
            </div>
            
            <p className="cls-basic-info-description">{apiDoc.description}</p>
            
            <div className="cls-basic-info-meta">
              <div className="cls-meta-item">
                <span className="cls-meta-label">Created by</span>
                <span className="cls-meta-value">{apiDoc.createdBy}</span>
              </div>
              <div className="cls-meta-item">
                <span className="cls-meta-label">Created</span>
                <span className="cls-meta-value">{apiDoc.createdDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Three Column Documentation Layout */}
        <div className="cls-three-column-layout">
          {/* First Column - API/Endpoint List */}
          <div className="cls-endpoints-column">
            <Card className="cls-endpoints-card">
              <CardContent className="cls-endpoints-content">
                <div className="cls-endpoints-header">
                  <div className="cls-search-wrapper">
                    <Search className="cls-search-icon" size={16} />
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="cls-search-input"
                    />
                  </div>
                </div>

                <div className="cls-endpoints-list">
                  {Object.entries(filteredGroups).map(([groupName, endpoints]) => (
                    <Collapsible
                      key={groupName}
                      open={expandedGroups.includes(groupName)}
                      onOpenChange={() => toggleGroup(groupName)}
                    >
                      <CollapsibleTrigger className="cls-group-trigger">
                        {expandedGroups.includes(groupName) ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                        <span className="cls-group-name">{groupName}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="cls-group-content">
                        {endpoints.map((endpoint: any) => (
                          <button
                            key={endpoint.id}
                            onClick={() => setSelectedEndpoint(endpoint.id)}
                            className={`cls-endpoint-item ${selectedEndpoint === endpoint.id ? 'cls-active' : ''}`}
                          >
                            <Badge className={`cls-method-badge cls-method-${endpoint.method.toLowerCase()}`}>
                              {endpoint.method}
                            </Badge>
                            <span className="cls-endpoint-name">{endpoint.name}</span>
                          </button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Column - API Details */}
          <div className="cls-details-column">
            <Card className="cls-details-card">
              <CardContent className="cls-details-content">
                <div className="cls-api-header">
                  <h2 className="cls-api-title">{currentEndpoint.name}</h2>
                  <p className="cls-api-description">{currentEndpoint.description}</p>
                </div>

                <div className="cls-api-endpoint-info">
                  <div className="cls-endpoint-row">
                    <Badge className={`cls-method-badge-large cls-method-${currentEndpoint.method.toLowerCase()}`}>
                      {currentEndpoint.method}
                    </Badge>
                    <code className="cls-endpoint-path">{currentEndpoint.path}</code>
                  </div>
                </div>

                {/* Parameters Section */}
                {currentEndpoint.parameters && currentEndpoint.parameters.length > 0 && (
                  <div className="cls-section">
                    <h3 className="cls-section-title">Parameters</h3>
                    <div className="cls-params-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>In</th>
                            <th>Required</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentEndpoint.parameters.map((param: any, idx: number) => (
                            <tr key={idx}>
                              <td><code>{param.name}</code></td>
                              <td><span className="cls-param-type">{param.type}</span></td>
                              <td><Badge variant="outline">{param.in}</Badge></td>
                              <td>
                                {param.required ? (
                                  <Badge className="cls-required-badge">Required</Badge>
                                ) : (
                                  <Badge variant="outline">Optional</Badge>
                                )}
                              </td>
                              <td>{param.description || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Request Body Section */}
                {currentEndpoint.requestBody && (
                  <div className="cls-section">
                    <h3 className="cls-section-title">Request Body</h3>
                    <div className="cls-code-block-wrapper">
                      <div className="cls-code-header">
                        <span className="cls-code-type">application/json</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(currentEndpoint.requestBody, 'request')}
                        >
                          {copiedCode === 'request' ? (
                            <CheckCircle2 size={14} className="text-green-600" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </Button>
                      </div>
                      <pre className="cls-code-block">
                        <code>{currentEndpoint.requestBody}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Third Column - Response Samples */}
          <div className="cls-response-column">
            <Card className="cls-response-card">
              <CardContent className="cls-response-content">
                <h3 className="cls-response-title">Response Samples</h3>
                
                <Tabs defaultValue={Object.keys(currentEndpoint.responses)[0]} className="cls-response-tabs">
                  <TabsList className="cls-response-tabs-list">
                    {Object.keys(currentEndpoint.responses).map((code) => (
                      <TabsTrigger 
                        key={code} 
                        value={code}
                        className={`cls-response-tab ${code.startsWith('2') ? 'cls-success' : 'cls-error'}`}
                      >
                        {code}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(currentEndpoint.responses).map(([code, response]: [string, any]) => (
                    <TabsContent key={code} value={code} className="cls-response-tab-content">
                      <div className="cls-response-description">
                        <p>{response.description}</p>
                      </div>

                      {response.example && (
                        <div className="cls-code-block-wrapper">
                          <div className="cls-code-header">
                            <span className="cls-code-type">Content type: application/json</span>
                            <div className="cls-code-actions">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopyCode(response.example, `response-${code}`)}
                              >
                                {copiedCode === `response-${code}` ? (
                                  <>
                                    <CheckCircle2 size={14} className="text-green-600" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} />
                                    <span>Copy</span>
                                  </>
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpandAll(code)}
                              >
                                {expandedResponses[code] ? (
                                  <>
                                    <Minimize2 size={14} />
                                    <span>Collapse all</span>
                                  </>
                                ) : (
                                  <>
                                    <Maximize2 size={14} />
                                    <span>Expand all</span>
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          <pre className="cls-code-block">
                            <code>{response.example}</code>
                          </pre>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
