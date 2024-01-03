import LayoutAdmin from "../components/LayoutAdmin";
import DataTable from "react-data-table-component";
import { PendonorAllData } from "../../../controllers/PendonorData";
import { useNavigate } from "react-router-dom";
import useTokenRefresh from "../../../controllers/useToken";
import { useEffect, useState } from "react";

const PendonorAdmin = () => {
  const { datatabel, columns} = PendonorAllData()

  const navigate = useNavigate()
  const {data, refreshToken} = useTokenRefresh()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    if (data && data.role !== undefined) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.role !== 'admin') {
    return navigate('/');
  }

  return (
    <LayoutAdmin>
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <section className="p-8 ">
          <h1 className="pb-3 font-semibold text-xl text-gray-900">Pendonor Page Data</h1>
          <DataTable columns={columns} data={datatabel} pagination highlightOnHover customStyles={{
              headRow: {
                style: {
                  border: '1px solid #dee2e6', // Add a border to the header row
                },
              },
              headCells: {
                style: {
                  borderRight: '1px solid #dee2e6', // Add a right border to header cells
                  justifyContent: 'center',

                },
              },

              rows: {
                style: {
                  border: '1px solid #dee2e6', // Add a border to all rows
                },
              },
              cells: {
                style: {
                  borderRight: '1px solid #dee2e6', // Add a right border to cells
                  textAlign: 'center', // Center the content of cells
                  justifyContent: 'center',

                },
              },
              pagination: {
                style: {
                  border: '1px solid #dee2e6', // Add a border to the pagination
                },
              },
            }} />
        </section>
      </div>
    </LayoutAdmin>
  );
};

export default PendonorAdmin;
