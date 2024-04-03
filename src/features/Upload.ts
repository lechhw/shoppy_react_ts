export const UploadImage = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_APP_CLOUDINARY_PRESET);
    return await fetch(import.meta.env.VITE_APP_CLOUDINARY_URL, {
        method: 'POST',
        body: data,
    })
        .then((res) => res.json())
        .then((data) => data.url);
};
