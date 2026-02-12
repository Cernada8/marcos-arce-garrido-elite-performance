const WhatsAppButton = () => {
  const phone = '34676202423';
  const message = encodeURIComponent('Hola Marcos, me interesan tus servicios!');
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-7 h-7"
      >
        <path d="M16.004 0C7.165 0 .004 7.161.004 16c0 2.822.736 5.584 2.137 8.012L.014 32l8.188-2.088A15.93 15.93 0 0 0 16.004 32C24.843 32 32 24.839 32 16S24.843 0 16.004 0zm0 29.116a13.08 13.08 0 0 1-6.668-1.824l-.478-.284-4.96 1.265 1.328-4.842-.312-.497A13.04 13.04 0 0 1 2.92 16c0-7.217 5.875-13.084 13.084-13.084S29.084 8.783 29.084 16s-5.863 13.116-13.08 13.116zm7.175-9.804c-.393-.197-2.326-1.148-2.687-1.279-.36-.131-.623-.197-.885.197s-1.017 1.279-1.246 1.541c-.23.262-.459.295-.852.099-.393-.197-1.66-.612-3.163-1.95-1.17-1.042-1.96-2.328-2.19-2.72-.229-.394-.024-.607.173-.803.177-.176.393-.459.59-.689.197-.23.263-.394.394-.656.131-.263.066-.492-.033-.689-.098-.197-.885-2.134-1.213-2.922-.32-.767-.644-.663-.885-.675l-.754-.013c-.262 0-.689.098-1.05.492s-1.377 1.345-1.377 3.28 1.41 3.805 1.607 4.067c.197.262 2.775 4.237 6.725 5.942.94.406 1.673.648 2.244.83.943.3 1.802.257 2.48.156.757-.113 2.327-.951 2.655-1.87.328-.918.328-1.705.23-1.869-.099-.164-.36-.262-.754-.459z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;