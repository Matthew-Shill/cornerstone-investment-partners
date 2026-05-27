/**
 * Active rental listings — add, remove, or edit entries as availability changes.
 *
 * Each property:
 * - id: unique string
 * - active: set false to hide without deleting
 * - address, location, beds, baths, rent, availableDate, description
 * - photos: paths under assets/properties/
 * - listingUrl: Apartments.com listing (optional)
 * - applyUrl: application link (optional; defaults to contact page with property pre-filled)
 */
window.PROPERTIES = [
  {
    id: "sample-rental-1",
    active: true,
    address: "123 Example Street",
    location: "Your City, ST",
    beds: 3,
    baths: 2,
    rent: 1850,
    availableDate: "Available Now",
    description:
      "Bright, well-maintained home with updated finishes, a comfortable layout, and responsive on-site management. Ideal for tenants looking for a straightforward rental experience.",
    photos: [
      "assets/properties/e77fbdab17281c38cc154a70d4a5e4e7l-b2669710828rd-w1280_h960.webp",
      "assets/properties/e77fbdab17281c38cc154a70d4a5e4e7l-b2607775896rd-w1280_h960.webp",
      "assets/properties/e77fbdab17281c38cc154a70d4a5e4e7l-b2514954879rd-w1280_h960.webp",
      "assets/properties/e77fbdab17281c38cc154a70d4a5e4e7l-b1862475913rd-w1280_h960.webp",
      "assets/properties/e77fbdab17281c38cc154a70d4a5e4e7l-b3141705285rd-w1280_h960.webp",
      "assets/properties/e77fbdab17281c38cc154a70d4a5e4e7l-b422972975rd-w1280_h960.webp",
      "assets/properties/e77fbdab17281c38cc154a70d4a5e4e7l-b1670012838rd-w1280_h960.webp",
    ],
    listingUrl: "",
    applyUrl: "",
  },
];
