import Navbar from "@/components/shared/Navbar";
import BookingForm from "@/components/booking/BookingForm";

export default function TrialBookingPage() {
  return (
    <>
      <Navbar />
      <BookingForm sessionType="trial" />
    </>
  );
}
