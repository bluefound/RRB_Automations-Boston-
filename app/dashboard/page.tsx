"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  property_address: string;
  status: string;
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Fetch leads on mount
    const fetchLeads = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("id, name, email, phone, property_address, status")
        .order("created_at", { ascending: false });
      if (!error && data) setLeads(data as Lead[]);
      setLoading(false);
    };
    fetchLeads();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("leads-table")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        () => {
          fetchLeads();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-2">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-200 p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">Agent Dashboard</h1>
        {loading ? (
          <div className="text-center text-blue-700 py-10">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No leads yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Property Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{lead.property_address}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        lead.status === "Received"
                          ? "bg-gray-200 text-gray-800"
                          : lead.status === "Emailed"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "Texted" || lead.status === "texted"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {lead.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
} 