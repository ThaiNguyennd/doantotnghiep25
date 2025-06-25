 const resizeImage = (file: File, maxWidth: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = (e) => {
      if (!e.target?.result) return reject("Không đọc được file");
      img.src = e.target.result as string;
    };

    reader.onerror = () => reject("Lỗi khi đọc ảnh");

    img.onload = () => {
      const scale = maxWidth / img.width;
      const canvas = document.createElement("canvas");
      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Không hỗ trợ canvas");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Không tạo được blob"));

        // ✅ ép kiểu blob rõ ràng
        const resizedFile = new File([blob as Blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });

        resolve(resizedFile);
      }, file.type || "image/jpeg", 0.8);
    };

    img.onerror = () => reject("Lỗi load ảnh");
    reader.readAsDataURL(file);
  });
};
export default resizeImage