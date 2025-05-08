import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ShareCertificate = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { profile } = useAuth();

  const generatePDF = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 10, 10, 280, 190);
      pdf.save('share-certificate.pdf');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div 
        ref={certificateRef}
        className="bg-white p-12 rounded-lg shadow-2xl border-8 border-double border-gray-300"
      >
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-6">Share Certificate</h1>
          <img src="/logo.svg" alt="Logo" className="mx-auto h-24 mb-6" />
          
          <div className="text-xl mb-8">
            This is to certify that
          </div>
          
          <div className="text-3xl font-bold mb-8">
            {profile?.first_name} {profile?.last_name}
          </div>
          
          <div className="text-xl mb-8">
            is the registered holder of
            <span className="font-bold mx-2">{profile?.shares?.length || 0}</span>
            shares in Mara Ripoi Wildlife Conservancy
          </div>
          
          <div className="grid grid-cols-2 gap-12 mt-16">
            <div>
              <div className="border-t-2 border-black pt-2">
                Director's Signature
              </div>
            </div>
            <div>
              <div className="border-t-2 border-black pt-2">
                Secretary's Signature
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-sm text-gray-600">
            Certificate No: {profile?.certificate_number}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transform transition duration-200 hover:scale-105"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default ShareCertificate;