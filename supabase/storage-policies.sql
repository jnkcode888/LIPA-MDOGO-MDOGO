-- Create the storage bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('website-requests', 'website-requests', false)
on conflict (id) do nothing;

-- Enable RLS (Row Level Security)
alter table storage.objects enable row level security;

-- Create policy for authenticated users to upload files
create policy "Allow authenticated users to upload files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'website-requests' AND
  (storage.foldername(name))[1] = 'logos' AND
  (storage.foldername(name))[2] IS NULL AND
  (storage.extension(name))[1] IN ('png', 'jpg', 'jpeg') AND
  length(name) < 100 AND
  length(content_type) < 100
);

-- Create policy for authenticated users to read their own files
create policy "Allow authenticated users to read their own files"
on storage.objects for select
to authenticated
using (bucket_id = 'website-requests');

-- Create policy for authenticated users to update their own files
create policy "Allow authenticated users to update their own files"
on storage.objects for update
to authenticated
using (bucket_id = 'website-requests')
with check (bucket_id = 'website-requests');

-- Create policy for authenticated users to delete their own files
create policy "Allow authenticated users to delete their own files"
on storage.objects for delete
to authenticated
using (bucket_id = 'website-requests');

-- Set up storage limits
update storage.buckets
set file_size_limit = 5242880, -- 5MB in bytes
    allowed_mime_types = array['image/png', 'image/jpeg', 'image/jpg']
where id = 'website-requests'; 