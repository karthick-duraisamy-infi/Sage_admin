
import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TablePagination } from "@/components/ui/table-pagination";
import {
  FileText,
  Download,
  Eye,
  Trash2,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Download as DownloadIcon,
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useLazyGetApiLogsDataQuery } from "@/service/apiLogs/apiLogs";
import "./ApiLogs.scss";

interface ApiLog {
  "date&time": string;
  method: string;
  path: string;
  responseCode: number;
  responseTime: string;
  ipAddress: string;
  user: string;
  apiKeyId?: string;
  organizationId?: string;
  environment?: string;
  requestBody?: any;
  responseBody?: any;
}

export default function ApiLogs() {
  const [getApiLogsData, apiLogsResponse] = useLazyGetApiLogsDataQuery();
  const [logsData, setLogsData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);
  const [logToDelete, setLogToDelete] = useState<ApiLog | null>(null);
  const [copiedSection, setCopiedSection] = useState<string>("");

  useEffect(() => {
    getApiLogsData();
  }, []);

  useEffect(() => {
    if (apiLogsResponse?.isSuccess && apiLogsResponse?.data) {
      setLogsData(apiLogsResponse.data);
    }
  }, [apiLogsResponse]);

  const getStatusBadgeClass = (code: number) => {
    if (code >= 200 && code < 300) return "cls-status-success";
    if (code >= 300 && code < 400) return "cls-status-redirect";
    if (code >= 400 && code < 500) return "cls-status-client-error";
    if (code >= 500) return "cls-status-server-error";
    return "";
  };

  const getMethodBadgeClass = (method: string) => {
    switch (method.toUpperCase()) {
      case "GET":
        return "cls-method-get";
      case "POST":
        return "cls-method-post";
      case "PUT":
        return "cls-method-put";
      case "DELETE":
        return "cls-method-delete";
      default:
        return "";
    }
  };

  const getStatusIcon = (code: number) => {
    if (code >= 200 && code < 300) return <CheckCircle2 size={48} />;
    if (code >= 400 && code < 500) return <AlertCircle size={48} />;
    if (code >= 500) return <XCircle size={48} />;
    return <FileText size={48} />;
  };

  // Filter logs
  const filteredLogs = logsData?.tableData?.filter((log: ApiLog) => {
    const matchesSearch =
      log.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMethod =
      methodFilter === "all" || log.method.toUpperCase() === methodFilter.toUpperCase();

    let matchesStatus = true;
    if (statusFilter !== "all") {
      const code = log.responseCode;
      if (statusFilter === "2xx" && (code < 200 || code >= 300)) matchesStatus = false;
      if (statusFilter === "3xx" && (code < 300 || code >= 400)) matchesStatus = false;
      if (statusFilter === "4xx" && (code < 400 || code >= 500)) matchesStatus = false;
      if (statusFilter === "5xx" && code < 500) matchesStatus = false;
    }

    return matchesSearch && matchesMethod && matchesStatus;
  }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex);

  const handleExport = () => {
    const csvContent = [
      ["Date & Time", "Method", "Path", "Response Code", "Response Time", "IP Address", "User"],
      ...filteredLogs.map((log: ApiLog) => [
        log["date&time"],
        log.method,
        log.path,
        log.responseCode,
        log.responseTime,
        log.ipAddress,
        log.user,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api-logs-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = () => {
    console.log("Delete log:", logToDelete);
    setLogToDelete(null);
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(""), 2000);
  };

  const handleDownloadLog = (log: ApiLog, index: number) => {
    const logData = {
      id: `log-${index + 1}`,
      timestamp: new Date(log["date&time"]).toISOString(),
      method: log.method,
      path: log.path,
      status: log.responseCode,
      responseTime: parseInt(log.responseTime),
      userId: log.user,
      ipAddress: log.ipAddress,
      requestBody: log.requestBody || { email: "john.smith@company.com" },
      responseBody: log.responseBody || { token: "..." },
      apiKeyId: log.apiKeyId || "1",
      organizationId: log.organizationId || "1",
      environment: log.environment || "Production",
    };

    const jsonContent = JSON.stringify(logData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `api-log-${logData.id}-${format(new Date(), "yyyy-MM-dd-HHmmss")}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AppLayout
      title="API Logs"
      subtitle="Review and audit API request and response logs."
    >
      <div className="cls-api-logs-container">
        {/* Summary Cards */}
        <div className="cls-summary-grid">
          {logsData?.mainInfo?.map((item: any, index: number) => (
            <Card key={index} className="cls-summary-card">
              <CardContent className="cls-summary-content">
                <div className="cls-summary-text">
                  <p className="cls-summary-label">{item.title}</p>
                  <h2 className="cls-summary-value">{item.count}</h2>
                </div>
                <div className={`cls-summary-icon cls-icon-${item.icon.toLowerCase().replace("icon", "")}`}>
                  {item.icon === "docsIcon" && <FileText size={24} />}
                  {item.icon === "successIcon" && <CheckCircle2 size={24} />}
                  {item.icon === "warningIcon" && <AlertCircle size={24} />}
                  {item.icon === "ErrorIcon" && <XCircle size={24} />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Table Card */}
        <Card className="cls-logs-table-card">
          <CardContent className="cls-logs-table-content">
            <div className="cls-table-header">
              <h2 className="cls-table-title">API Logs</h2>

              {/* Filters */}
              <div className="cls-filters-row">
                <div className="cls-search-container">
                  <Input
                    type="text"
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="cls-search-input"
                  />
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="cls-date-filter">
                      <CalendarIcon size={16} />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        "Jul 20, 2024 - Dec 22, 2025"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>

                <Select
                  value={methodFilter}
                  onValueChange={(value) => {
                    setMethodFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="cls-method-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All methods</SelectItem>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="cls-status-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="2xx">2xx Success</SelectItem>
                    <SelectItem value="3xx">3xx Redirection</SelectItem>
                    <SelectItem value="4xx">4xx Client Error</SelectItem>
                    <SelectItem value="5xx">5xx Server Error</SelectItem>
                  </SelectContent>
                </Select>

                <Button onClick={handleExport} className="cls-export-button">
                  <Download size={16} />
                  Export
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="cls-table-container">
              <table className="cls-logs-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Method</th>
                    <th>Path</th>
                    <th>Status</th>
                    <th>Response Time</th>
                    <th>User / IP Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log: ApiLog, index: number) => (
                    <tr key={index}>
                      <td className="cls-timestamp">{log["date&time"]}</td>
                      <td>
                        <Badge className={getMethodBadgeClass(log.method)}>
                          {log.method}
                        </Badge>
                      </td>
                      <td className="cls-path">{log.path}</td>
                      <td>
                        <Badge className={getStatusBadgeClass(log.responseCode)}>
                          {log.responseCode}
                        </Badge>
                      </td>
                      <td>{log.responseTime}</td>
                      <td>
                        <div className="cls-user-info">
                          <span className="cls-user">{log.user}</span>
                          <span className="cls-ip">{log.ipAddress}</span>
                        </div>
                      </td>
                      <td>
                        <div className="cls-actions">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedLog(log)}
                            className="cls-action-button"
                            title="View details"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadLog(log, startIndex + index)}
                            className="cls-action-button cls-download-button"
                            title="Download as JSON"
                          >
                            <DownloadIcon size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setLogToDelete(log)}
                            className="cls-action-button cls-delete-button"
                            title="Delete log"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {filteredLogs.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredLogs.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}

        {/* View Dialog */}
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="cls-view-dialog">
            <DialogHeader>
              <DialogTitle className="cls-dialog-title">Log Details</DialogTitle>
              <p className="cls-dialog-subtitle">
                Detailed information for log entry log-{selectedLog ? paginatedLogs.indexOf(selectedLog) + 1 : "1"}.
              </p>
            </DialogHeader>
            {selectedLog && (
              <div className="cls-log-details">
                {/* Method, Path and Status */}
                <div className="cls-detail-method-path">
                  <Badge className={getMethodBadgeClass(selectedLog.method)}>
                    {selectedLog.method}
                  </Badge>
                  <span className="cls-path-text">{selectedLog.path}</span>
                  <Badge className={`${getStatusBadgeClass(selectedLog.responseCode)} cls-status-badge-large`}>
                    {selectedLog.responseCode}
                  </Badge>
                </div>

                {/* Details Grid */}
                <div className="cls-detail-grid">
                  <div className="cls-detail-item">
                    <span className="cls-detail-label">Timestamp</span>
                    <span className="cls-detail-value">{selectedLog["date&time"]}</span>
                  </div>
                  <div className="cls-detail-item">
                    <span className="cls-detail-label">Response Time</span>
                    <span className="cls-detail-value">{selectedLog.responseTime}</span>
                  </div>
                  <div className="cls-detail-item">
                    <span className="cls-detail-label">User ID</span>
                    <span className="cls-detail-value">{selectedLog.user}</span>
                  </div>
                  <div className="cls-detail-item">
                    <span className="cls-detail-label">IP Address</span>
                    <span className="cls-detail-value">{selectedLog.ipAddress}</span>
                  </div>
                  <div className="cls-detail-item">
                    <span className="cls-detail-label">API Key ID</span>
                    <span className="cls-detail-value">{selectedLog.apiKeyId || "1"}</span>
                  </div>
                  <div className="cls-detail-item">
                    <span className="cls-detail-label">Organization ID</span>
                    <span className="cls-detail-value">{selectedLog.organizationId || "1"}</span>
                  </div>
                </div>

                {/* Environment Badge */}
                <div className="cls-environment-section">
                  <span className="cls-detail-label">Environment</span>
                  <Badge className="cls-environment-badge">
                    {selectedLog.environment || "Production"}
                  </Badge>
                </div>

                {/* Request Body */}
                <div className="cls-body-section">
                  <div className="cls-body-header">
                    <h4 className="cls-body-title">Request Body</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          JSON.stringify(selectedLog.requestBody || { email: "john.smith@company.com" }, null, 2),
                          "request"
                        )
                      }
                      className="cls-copy-button"
                    >
                      {copiedSection === "request" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <pre className="cls-body-content">
                    {JSON.stringify(selectedLog.requestBody || { email: "john.smith@company.com" }, null, 2)}
                  </pre>
                </div>

                {/* Response Body */}
                <div className="cls-body-section">
                  <div className="cls-body-header">
                    <h4 className="cls-body-title">Response Body</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleCopy(
                          JSON.stringify(selectedLog.responseBody || { token: "..." }, null, 2),
                          "response"
                        )
                      }
                      className="cls-copy-button"
                    >
                      {copiedSection === "response" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <pre className="cls-body-content">
                    {JSON.stringify(selectedLog.responseBody || { token: "..." }, null, 2)}
                  </pre>
                </div>

                {/* Close Button */}
                <div className="cls-dialog-footer">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedLog(null)}
                    className="cls-close-button"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!logToDelete} onOpenChange={() => setLogToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete API Log</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this API log? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="cls-delete-confirm">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
