import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { EditorT, MediasT } from './editor';
import { Database } from '@/lib/supabase/types/index.types';

export async function UploadProject({
  projectId,
  thumbnailFile,
  thumbnailName,
  supabase,
  previousThumbnail,
  values,
  medias,
  savedDB,
}: {
  thumbnailFile: File | undefined;
  thumbnailName: string | undefined;
  supabase: SupabaseClient<Database, 'public'>;
  projectId: string;
  previousThumbnail: string;
  values: EditorT;
  medias: MediasT[];
  savedDB: boolean;
}) {
  let thumbnail_src: string = '';
  if (thumbnailFile) {
    const uploadName = `${projectId}/thumbnail/${thumbnailName}`;

    let previousFileName = previousThumbnail.replace(
      'https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/projects/',
      ''
    );

    console.log('uploadName, previousFileName', uploadName, previousFileName);
    if (uploadName != previousFileName) {
      const { data, error: uploadThumbnailError } = await supabase.storage
        .from('projects')
        .upload(uploadName, thumbnailFile);

      if (uploadThumbnailError) {
        console.log(
          'ERROR WHEN TRY TO UPLOAD THUMBNAIL!',
          JSON.stringify(uploadThumbnailError)
        );
        // throw new Error('ERROR WHEN TRY TO UPLOAD THUMBNAIL!');
      }
    }
    thumbnail_src = `https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/projects/${uploadName}`;
  } else {
    if (thumbnailName) thumbnail_src = thumbnailName;
  }
  if (values.tags) {
    let data: any, error: PostgrestError | null;
    if (savedDB) {
      console.log('HEYY MODIFY', values, projectId, thumbnail_src);
      const updateRes = await supabase
        .from('projects')
        .update({
          title: values.title,
          category: values.category?.name,
          completed_at: values.completed_at,
          desc: values.desc,
          tags: values.tags?.map((tag) => tag.value),
          thumbnail: thumbnail_src,
          medias: medias,
          started_at: values.started_at,
          links: values.links,
        })
        .eq('id', projectId);
      error = updateRes.error;
    } else {
      const insertRes = await supabase.from('projects').insert([
        {
          id: projectId,
          title: values.title,
          category: values.category?.name,
          completed_at: values.completed_at,
          desc: values.desc,
          tags: values.tags?.map((tag) => tag.value),
          thumbnail: thumbnail_src,
          medias: medias,
          started_at: values.started_at,
          links: values.links,
        },
      ]);
      error = insertRes.error;
    }

    if (error) {
      alert('ERROR CREATING PROJECT\ncheck console');
      console.log('ERROR CREATING PROJECT\n', JSON.stringify(error));
      return 'error';
    } else {
      alert('success!');
      return 'success';
    }
  }
}
