import { useRef, useState } from 'react';

export default function ProjectEditorThumbnail({
  thumbnailError,
  projectId,
  setThumbnailFile,
  setThumbnailName,
  thumbnailSrc,
}: {
  thumbnailSrc?: string;
  thumbnailError?: string;
  projectId: string;
  setThumbnailName: (field: string, value: string) => void;
  setThumbnailFile: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<{
    src: string;
    name: string;
  }>({
    src: thumbnailSrc ? thumbnailSrc : '',
    name: '',
  });

  const handleFileInputChange = () => {
    const file = fileInputRef.current?.files && fileInputRef.current?.files[0];

    if (file) {
      console.log(file);
      const objectUrl = URL.createObjectURL(file);

      setImageFile({
        src: objectUrl,
        name: file.name,
      });
      setThumbnailName('thumbnail', file.name);
      setThumbnailFile(file);
    }
  };

  return (
    <>
      <div className="col-span-3 flex flex-col">
        <div className="flex flex-col">
          <label className="mb-3 MADEMellow text-xl font-light">
            Thumbnail
          </label>
          <input
            type="file"
            max={'50mb'}
            accept=".png, .jpg, .jpeg"
            className="bg-brand-50 border-brand-350 border-2 rounded-md"
            ref={fileInputRef}
            onInput={handleFileInputChange}
          ></input>
          <p className=" text-red-500">{thumbnailError}</p>
        </div>
        {/* <div className="flex flex-col mt-8">
          <label className="mb-3 MADEMellow text-xl font-light">
            Thumbnail Img Name
          </label>
          <input
            type="text"
            className="bg-brand-50 border-brand-350 border-2 rounded-md"
          ></input>
        </div> */}
      </div>
      <div className="col-span-3 flex flex-col">
        <label className="mb-3 MADEMellow text-xl font-light">
          Thumbnail Preview
        </label>
        <img src={imageFile.src}></img>
      </div>
    </>
  );
}
