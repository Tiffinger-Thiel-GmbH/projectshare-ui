import React, { useState, useEffect } from 'react';

import { DocumentDTO, baseUrl } from '../api/apis';
import StringTable from './StringTable';

interface Props {
  documents: DocumentDTO[];
}

const mapDocuments = (documents: DocumentDTO[]) => {
  return documents.map(d => {
    return {
      key: d.id,
      values: { ...d }
    };
  });
};

export default function DocumentTable({ documents }: Props) {
  const [sortedDocuments, setSortedDocuments] = useState(mapDocuments(documents));

  const sortBy = (isDescending: boolean, columnKey: keyof DocumentDTO) => {
    const newDocuments = documents.sort((a, b) => {
      if (isDescending) {
        return a[columnKey].localeCompare(b[columnKey], 'de');
      }
      return -a[columnKey].localeCompare(b[columnKey], 'de');
    });

    setSortedDocuments(mapDocuments(newDocuments));
  };

  const getDocumentDetailsWithId = (documentId: string) => {
    return sortedDocuments.find(d => d.key === documentId);
  };

  const handleRowClick = (documentId: string) => {
    const doc = getDocumentDetailsWithId(documentId);
    if (!doc) return;
    const link = document.createElement('a');
    link.href = baseUrl + '/document/' + doc.values.location + '/' + doc.values.id;
    link.setAttribute('download', doc.values.name);
    document.body.appendChild(link);

    link.click();
  };

  useEffect(() => {
    setSortedDocuments(mapDocuments(documents));
  }, [documents]);

  return (
    <>
      <StringTable
        handleRowClick={handleRowClick}
        columns={[
          {
            key: 'id',
            name: 'ID',
            sort: isDescending => sortBy(isDescending, 'id')
          },
          {
            key: 'location',
            name: 'Location',
            sort: isDescending => sortBy(isDescending, 'location')
          },
          {
            key: 'name',
            name: 'Name',
            sort: isDescending => sortBy(isDescending, 'name')
          }
        ]}
        values={sortedDocuments}
      />
    </>
  );
}
