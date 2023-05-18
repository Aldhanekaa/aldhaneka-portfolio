import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { JournalEditorT } from './editor';
import { Database } from '@/lib/supabase/types/index.types';

export async function UploadJournal({
  journalId,
  thumbnailFile,
  thumbnailName,
  supabase,
  previousThumbnail,
  values,
  savedDB,
}: {
  thumbnailFile: File | undefined;
  thumbnailName: string | undefined;
  supabase: SupabaseClient<Database, 'public'>;
  journalId: string;
  previousThumbnail: string;
  values: JournalEditorT;
  savedDB: boolean;
}) {
  let thumbnail_src: string = '';
  if (thumbnailFile) {
    const uploadName = `${journalId}/thumbnail/${thumbnailName}`;

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
      console.log('HEYY MODIFY', values, journalId, thumbnail_src);
      const updateRes = await supabase
        .from('journal_posts')
        .update({
          id: journalId,
          title: values.title,
          desc: values.desc,
          tags: values.tags.map((tag) => tag.value),
          thumbnail: thumbnail_src,

          category: values.category?.value,
          content: values.content,
        })
        .eq('id', journalId);
      error = updateRes.error;
    } else {
      if (values.category?.value) {
        const insertRes = await supabase.from('journal_posts').insert([
          {
            id: journalId,
            title: values.title,
            desc: values.desc,
            tags: values.tags.map((tag) => tag.value),
            thumbnail: thumbnail_src,

            category: values.category?.value,
            content: values.content,
          },
        ]);
        error = insertRes.error;
        if (error) {
          alert('ERROR CREATING JOURNAL\ncheck console');
          console.log('ERROR CREATING PROJECT\n', JSON.stringify(error));
          return 'error';
        } else {
          alert('success!');
        }
      }
    }

    return 'success';
    // }
  }
}
