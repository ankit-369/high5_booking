import Navbar from "@/components/shared/Navbar";
import BookingForm from "@/components/booking/BookingForm";
import { mockClients } from "@/lib/mockData";

export default function AssessmentBookingPage({
  searchParams,
}: {
  searchParams: { phone?: string };
}) {
  const client = searchParams.phone
    ? mockClients.find((c) => c.phone === searchParams.phone)
    : undefined;

  return (
    <>
      <Navbar />
      <BookingForm sessionType="assessment" prefillData={client} />
    </>
  );
}
