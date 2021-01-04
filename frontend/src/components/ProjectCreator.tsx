import React from 'react';
import { Grid, IconButton, TextField } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { createProject } from '../api/apis';

interface Props {
  projectToCreate: string;
  setProjectToCreate: (name: string) => void;
}

export default function ProjectCreator({ projectToCreate, setProjectToCreate }: Props) {
  const onCreateProject = async () => {
    if (projectToCreate !== '') {
      await createProject(projectToCreate).then(() => setProjectToCreate(''));
    }
  };

  return (
    <Grid container spacing={1} alignItems="flex-end" style={{ minHeight: '56px' }}>
      <Grid item xs={1}>
        <IconButton onClick={() => onCreateProject()}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
      <Grid item xl={11}>
        <TextField
          id="input-with-icon-grid"
          label="New Project"
          fullWidth
          value={projectToCreate}
          onChange={e => setProjectToCreate(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
