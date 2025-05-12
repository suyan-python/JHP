import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo/JHPstore.png"; // Your actual logo path

export const generatePDFReceipt = (order) => {
  const doc = new jsPDF();

  // Load and draw the logo with preserved aspect ratio
  const img = new Image();
  img.src = logo;

  img.onload = () => {
    // Calculate centered position while preserving aspect ratio
    const originalWidth = img.width;
    const originalHeight = img.height;
    const displayHeight = 25;
    const aspectRatio = originalWidth / originalHeight;
    const displayWidth = displayHeight * aspectRatio;

    const pageWidth = doc.internal.pageSize.getWidth();
    const xPosition = (pageWidth - displayWidth) / 2;

    doc.addImage(img, "PNG", xPosition, 10, displayWidth, displayHeight);

    // Title
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("Order Receipt", pageWidth / 2, 45, null, null, "center");

    // Customer Info
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(
      `Customer: ${order.firstName || ""} ${order.lastName || ""}`,
      10,
      60
    );
    doc.text(`Phone: ${order.phone || ""}`, 10, 68);
    doc.text(`Email: ${order.email || ""}`, 10, 76);
    doc.text(`Payment Method: ${order.paymentMethod || ""}`, 10, 84);

    // Items Table
    const items = Array.isArray(order.items)
      ? order.items.map((item, i) => [
          i + 1,
          item.name || "",
          item.size || "250g",
          `NRs. ${item.price || 0}`,
        ])
      : [];

    autoTable(doc, {
      startY: 100,
      head: [["#", "Item", "Size", "Price"]],
      body: items,
      styles: {
        fontSize: 11,
        cellPadding: 3,
        valign: "middle",
      },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        halign: "center",
      },
      columnStyles: {
        0: { halign: "center", cellWidth: 10 },
        1: { cellWidth: 70 },
        2: { halign: "center", cellWidth: 30 },
        3: { halign: "right", cellWidth: 30 },
      },
    });

    const finalY = doc.lastAutoTable.finalY || 110;

    // Totals
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(
      `Total: NRs. ${parseFloat(order.total || 0).toFixed(2)}`,
      140,
      finalY + 10
    );
    doc.text(
      `Discounted Total: NRs. ${parseFloat(
        order.discountedTotal || order.total || 0
      ).toFixed(2)}`,
      140,
      finalY + 18
    );

    // Save the file
    doc.save(`receipt_${Date.now()}.pdf`);
  };
};
