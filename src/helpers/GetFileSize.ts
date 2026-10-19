export function getFileSize(file: File) {
  const size = Math.floor(Math.log(file.size) / Math.log(1024));
  return (
    Number((file.size / Math.pow(1024, size)).toFixed(2)) * 1 +
    " " +
    ["B", "KB", "MB", "GB", "TB"][size]
  );
}