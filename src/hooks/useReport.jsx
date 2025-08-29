import { useMutation } from '@tanstack/react-query';
import { getReports } from '../api/reports';

export const useGetReports = () => {
  return useMutation({
    mutationFn: getReports,
    onSuccess: (response) => {
     
      const blob = new Blob([response.data], {
        type:
          response.headers['content-type'] ||
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      const disposition = response.headers['content-disposition'];
      let filename = 'report.xlsx';
      if (disposition && disposition.includes('filename=')) {
        filename = disposition
          .split('filename=')[1]
          .replace(/['"]/g, '')
          .trim();
      }

      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    onError: (error) => {
      console.error('Download failed', error);
    },
  });
};
