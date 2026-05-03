import Navbar from "@/components/shared/Navbar";
import BookingForm from "@/components/booking/BookingForm";

export default function ConsultationBookingPage() {
  return (
    <>
      <Navbar />
      <BookingForm sessionType="consultation" />
    </>
  );
}
