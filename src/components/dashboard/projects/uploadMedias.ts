import { SupabaseClient } from '@supabase/supabase-js';
import { EditorMediasT } from './editorMedia';
import { EditorT, MediasT } from './editor';

export async function UploadMedias({
  supabase,
  medias,
  projectId,
  previousMedias,
}: {
  projectId: string;
  supabase: SupabaseClient;
  medias: Array<EditorMediasT>;
  previousMedias: MediasT[];
}) {
  let previousMediasObj: {
    [key: string]: { title: string; src: string; type: 'iframe' | 'image' };
  } = {};

  for (let i = 0; i < previousMedias.length; i++) {
    let mediaobj = previousMedias[i];
    previousMediasObj[mediaobj.id] = {
      title: mediaobj.title,
      type: mediaobj.type,
      src: mediaobj.src,
    };
  }

  let ReturnedMedias: MediasT[] = [];

  console.log('medias', medias);
  for (let i = 0; i < medias.length; i++) {
    let media = medias[i];

    console.log(media, previousMediasObj[media.id]);

    if (media.type == 'image' && media.file) {
      const uploadName = `${projectId}/${media.file.name}`;

      if (previousMediasObj[media.id] == undefined) {
        const { data, error } = await supabase.storage
          .from('projects')
          .upload(uploadName, media.file);

        if (error) {
          console.log('ERROR UPLOADING MEDIA IMG', JSON.stringify(error));
        } else {
          ReturnedMedias.push({
            id: media.id,
            title: media.title,
            src: `https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/projects/${uploadName}`,
            type: media.type,
          });
        }
      } else {
        let previousFileName = previousMediasObj[media.id].src.replace(
          'https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/projects/',
          ''
        );

        if (previousFileName != uploadName) {
          const { data, error } = await supabase.storage
            .from('projects')
            .upload(uploadName, media.file);

          if (error) {
            console.log('ERROR UPLOADING MEDIA IMG', JSON.stringify(error));
          } else {
            ReturnedMedias.push({
              id: media.id,
              title: media.title,
              src: `https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/projects/${uploadName}`,
              type: media.type,
            });
          }
        }

        // console.log('PREVIOUS FILE NAME', previousFileName);
      }
    } else {
      ReturnedMedias.push({
        id: media.id,
        title: media.title,
        src: media.src,
        type: media.type,
      });
    }
  }

  console.log(ReturnedMedias);

  return ReturnedMedias;
}
