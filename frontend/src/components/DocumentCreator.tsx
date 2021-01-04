import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { uploadDocument } from '../api/apis';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

interface Props {
  selectedProject?: string;
  setDocumentToUpload: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export default function DocumentCreator({ selectedProject, setDocumentToUpload }: Props) {
  const fileUpload = React.createRef<HTMLInputElement>();

  const onUploadDocument = async (file?: File | null) => {
    if (file && selectedProject) {
      const newFormData = new FormData();

      newFormData.append('file', file, file.name);

      await uploadDocument(selectedProject, newFormData).then(() => setDocumentToUpload(file));
    }
  };
  return (
    <Grid container spacing={1} alignItems="flex-end" style={{ minHeight: '56px' }}>
      <Grid item xs={12}>
        <Button
          onClick={() => fileUpload.current?.click()}
          variant="contained"
          color="default"
          disabled={selectedProject === undefined || selectedProject?.length == 0}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
        <input type="file" style={{ display: 'none ' }} onChange={e => onUploadDocument(e.target.files?.item(0))} ref={fileUpload} />
      </Grid>
    </Grid>
  );
}
