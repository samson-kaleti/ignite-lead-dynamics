
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LeadInteraction } from "@/types/leads";
import { toast } from "sonner";

export function useLeadInteractions(leadId: string) {
  const queryClient = useQueryClient();

  const { data: interactions, isLoading } = useQuery({
    queryKey: ['leadInteractions', leadId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lead_interactions')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as LeadInteraction[];
    },
  });

  const addInteraction = useMutation({
    mutationFn: async (newInteraction: Omit<LeadInteraction, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('lead_interactions')
        .insert([newInteraction])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadInteractions', leadId] });
      toast.success('Interaction added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add interaction');
      console.error('Error adding interaction:', error);
    },
  });

  return {
    interactions,
    isLoading,
    addInteraction: addInteraction.mutate,
    isAdding: addInteraction.isPending,
  };
}
