import React, { useEffect, useState } from 'react';
import ProjectTable from '../components/ProjectTable';
import DocumentTable from '../components/DocumentTable';
import { Grid, Container, Box, makeStyles } from '@material-ui/core';
import { DocumentDTO, getDocumentsByProjectId, getProjects, ProjectDTO } from '../api/apis';
import ProjectCreator from '../components/ProjectCreator';
import DocumentCreator from '../components/DocumentCreator';
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

export default function Content() {
  const [selectedProject, setSelectedProject] = useState<string>();
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [documents, setDocuments] = useState<DocumentDTO[]>([]);
  const [documentToUpload, setDocumentToUpload] = useState<File | undefined>();
  const [projectToCreate, setProjectToCreate] = useState('');
  const style = useStyles();

  useEffect(() => {
    getProjects().then(setProjects);
  }, [projectToCreate]);

  useEffect(() => {
    if (selectedProject) {
      getDocumentsByProjectId(selectedProject).then(setDocuments);
    } else {
      setDocuments([]);
    }
  }, [selectedProject, documentToUpload]);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container justify="center" spacing={4}>
          <Grid item xs={6}>
            <Box ml={8} mt={4} textAlign="center">
              <div className={style.margin}>
                <ProjectCreator setProjectToCreate={setProjectToCreate} projectToCreate={projectToCreate} />
              </div>
              <ProjectTable setSelectedProject={setSelectedProject} projects={projects} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mr={8} mt={4} textAlign="center">
              <div className={style.margin}>
                <DocumentCreator setDocumentToUpload={setDocumentToUpload} selectedProject={selectedProject} />
              </div>
              <DocumentTable documents={documents} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
