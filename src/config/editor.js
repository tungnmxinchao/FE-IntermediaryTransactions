export const TINYMCE_API_KEY = '3dnf4g9cgv4sfog9pgz0n3f33fqrskhx8tz3ejpcmhn480gh';

export const DEFAULT_EDITOR_CONFIG = {
  height: 300,
  menubar: false,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount'
  ],
  toolbar: 'undo redo | blocks | ' +
    'bold italic | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
};

export const COMPACT_EDITOR_CONFIG = {
  ...DEFAULT_EDITOR_CONFIG,
  height: 200
}; 