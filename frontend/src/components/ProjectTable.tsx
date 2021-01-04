import React, { useState, useEffect } from 'react';
import { ProjectDTO } from '../api/apis';
import StringTable from './StringTable';

interface Props {
  projects: ProjectDTO[];
  setSelectedProject: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const mapProjects = (projects: ProjectDTO[]) => {
  return projects.map(p => {
    return {
      key: p.id,
      values: { ...p }
    };
  });
};

export default function ProjectTable({ setSelectedProject, projects }: Props) {
  // TODO put sortedState into StringTable directly
  const [sortedProjects, setSortedProjects] = useState(mapProjects(projects));
  const handleRowClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const sortBy = (isDescending: boolean, columnKey: keyof ProjectDTO) => {
    const newProjects = projects.sort((a, b) => {
      if (isDescending) {
        return a[columnKey].localeCompare(b[columnKey], 'de');
      }
      return -a[columnKey].localeCompare(b[columnKey], 'de');
    });

    setSortedProjects(mapProjects(newProjects));
  };

  useEffect(() => {
    setSortedProjects(mapProjects(projects));
  }, [projects]);

  return (
    <StringTable
      handleRowClick={handleRowClick}
      columns={[
        {
          key: 'name',
          name: 'Name',
          sort: isDescending => sortBy(isDescending, 'name')
        },
        {
          key: 'id',
          name: 'ID',
          sort: isDescending => sortBy(isDescending, 'id')
        }
      ]}
      values={sortedProjects}
    />
  );
}
