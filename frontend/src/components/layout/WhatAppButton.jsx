// Replace with the shop's real WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = "923001234567";
const DEFAULT_MESSAGE = "Assalam-o-Alaikum, I have a question about your products.";

export default function WhatsAppButton() {
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center
                 w-14 h-14 rounded-full bg-[#25D366]
                 hover:scale-105 transition-transform duration-200"
      style={{ boxShadow: "0 4px 14px rgba(22, 20, 15, 0.25)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="white"
      >
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.29.635 4.428 1.737 6.257L4 29l7.938-1.688A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3zm0 21.75c-1.95 0-3.766-.55-5.312-1.5l-.381-.226-4.712 1.002 1.006-4.594-.248-.394A9.71 9.71 0 0 1 6.25 15c0-5.385 4.366-9.75 9.751-9.75S25.75 9.615 25.75 15 20.386 24.75 16.001 24.75zm5.373-7.312c-.294-.147-1.74-.859-2.01-.957-.27-.098-.467-.147-.663.147-.196.294-.76.957-.932 1.153-.171.196-.343.221-.637.074-.294-.147-1.243-.458-2.367-1.46-.875-.78-1.466-1.744-1.638-2.038-.171-.294-.018-.453.129-.6.132-.131.294-.343.441-.514.147-.171.196-.294.294-.49.098-.196.049-.368-.025-.514-.074-.147-.663-1.6-.909-2.19-.239-.573-.482-.496-.663-.505l-.564-.01c-.196 0-.514.074-.784.368-.27.294-1.03 1.006-1.03 2.454s1.055 2.848 1.202 3.044c.147.196 2.077 3.172 5.032 4.447.703.303 1.252.484 1.68.62.706.225 1.348.193 1.856.117.566-.085 1.74-.712 1.985-1.4.245-.688.245-1.278.171-1.4-.073-.123-.269-.196-.563-.343z" />
      </svg>
    </a>
  );
}