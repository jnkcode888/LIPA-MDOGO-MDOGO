-- Create the website_requests table
CREATE TABLE IF NOT EXISTS website_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    whatsapp TEXT,
    email TEXT,
    business_type TEXT,
    target_audience TEXT,
    competitors TEXT,
    features TEXT[],
    additional_features TEXT,
    branding TEXT,
    design_style TEXT,
    reference_websites TEXT,
    technical_requirements TEXT,
    hosting_preferences TEXT,
    maintenance TEXT,
    budget TEXT,
    deadline TEXT,
    additional_notes TEXT,
    files JSONB,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a function to create the table if it doesn't exist
CREATE OR REPLACE FUNCTION create_website_requests_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- The table creation is handled by the migration
    -- This function is just a placeholder for the RPC call
    RETURN;
END;
$$; 