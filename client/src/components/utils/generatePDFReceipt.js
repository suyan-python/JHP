import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../assets/logo/JHPstore.png"; // Ensure this is base64 or publicly accessible if needed

export const generatePDFReceipt = (order) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const lineSpacing = 8;
  let currentY = 10;

  const addImageWithAspectRatio = (
    img,
    xCenter,
    yCenter,
    maxWidth,
    maxHeight
  ) => {
    const imgProps = doc.getImageProperties(img);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;
    const aspectRatio = imgWidth / imgHeight;

    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    const x = xCenter - width / 2;
    const y = yCenter - height / 2;

    doc.addImage(img, "PNG", x, y, width, height);
  };

  // === Watermark ===
  try {
    doc.setTextColor(150);
    doc.setFontSize(12);
    doc.setDrawColor(255, 255, 255);
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, "F"); // white background
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    addImageWithAspectRatio(logo, pageWidth / 2, pageHeight / 2, 120, 80);
    doc.setGState(new doc.GState({ opacity: 1 }));
  } catch (err) {
    console.warn("Watermark could not be added:", err);
  }

  // === Top Logo (Centered) ===
  try {
    addImageWithAspectRatio(logo, pageWidth / 2, currentY + 10, 80, 50);
    currentY += 30;
  } catch (err) {
    console.warn("Top logo could not be added:", err);
    currentY += 10;
  }

  // === Title ===
  doc.setFontSize(16);
  doc.setTextColor(40);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice", pageWidth / 2, currentY, null, null, "right");
  currentY += lineSpacing + 4;

  // === Order Info ===
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const date = new Date().toLocaleString();
  doc.text(`Date: ${date}`, 10, currentY);

  const orderId = order._id || order.orderId;
  if (orderId) {
    doc.text(`Order ID: ${orderId}`, pageWidth - 60, currentY);
  }
  currentY += lineSpacing;

  // === Customer Info ===
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(
    `Customer: ${order.firstName || ""} ${order.lastName || ""}`,
    10,
    currentY
  );
  currentY += lineSpacing;
  doc.text(`Phone: ${order.phone || "N/A"}`, 10, currentY);
  currentY += lineSpacing;
  doc.text(`Email: ${order.email || "N/A"}`, 10, currentY);
  currentY += lineSpacing;
  doc.text(`Payment Method: ${order.paymentMethod || "N/A"}`, 10, currentY);
  currentY += lineSpacing + 4;

  // === Items Table ===
  const items = Array.isArray(order.items)
    ? order.items.map((item, i) => {
        const itemId = item.itemId || `#${i + 1}`;
        const name = item.name || "Unnamed Item";
        const size = item.selectedSize ? `${item.selectedSize}g` : "250g";
        const quantity = item.quantity || 1;
        const unitPrice = parseFloat(item.price || 0);
        const totalPrice = unitPrice * quantity;

        return [
          i + 1,
          itemId,
          name,
          size,
          `NRs. ${unitPrice.toFixed(2)}`,
          quantity,
          `NRs. ${totalPrice.toFixed(2)}`,
        ];
      })
    : [];

  autoTable(doc, {
    startY: currentY,
    head: [
      ["#", "Item ID", "Item", "Size", "Unit Price", "Qty", "Total Price"],
    ],
    body: items,
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: "middle",
      halign: "center",
    },
    headStyles: {
      fillColor: [47, 79, 79],
      textColor: [255, 255, 255],
    },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 20 },
      2: { cellWidth: 60 },
      3: { cellWidth: 25 },
      4: { cellWidth: 30 },
      5: { cellWidth: 20 },
      6: { cellWidth: 30 },
    },
    tableWidth: pageWidth - 20,
    margin: { top: currentY, left: 10, right: 10 },
  });

  const finalY = doc.lastAutoTable.finalY || currentY + 10;

  // === Pricing Summary ===
  const subtotal = parseFloat(order.total || 0).toFixed(2);
  const discountedTotal = parseFloat(order.discountedTotal || 0).toFixed(2);
  const shipping = parseFloat(order.shipping || 0).toFixed(2);

  let summaryY = finalY + 10;
  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");
  doc.text(`Subtotal:`, 130, summaryY);
  doc.setFont("helvetica", "normal");
  doc.text(`NRs. ${subtotal}`, 200, summaryY, null, null, "right");

  if (order.discountedTotal) {
    summaryY += 8;
    doc.setFont("helvetica", "bold");
    doc.text(`Discounted Total:`, 130, summaryY);
    doc.setFont("helvetica", "normal");
    doc.text(`NRs. ${discountedTotal}`, 200, summaryY, null, null, "right");
  }

  if (order.shipping) {
    summaryY += 8;
    doc.setFont("helvetica", "bold");
    doc.text(`Shipping Fee:`, 130, summaryY);
    doc.setFont("helvetica", "normal");
    doc.text(`NRs. ${shipping}`, 200, summaryY, null, null, "right");

    // === Grand Total ===
    const grandTotal =
      parseFloat(order.discountedTotal || order.total || 0) +
      parseFloat(order.shipping || 0);
    summaryY += 8;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40);
    doc.text(`Grand Total:`, 130, summaryY);
    doc.setFont("helvetica", "normal");
    doc.text(
      `NRs. ${grandTotal.toFixed(2)}`,
      200,
      summaryY,
      null,
      null,
      "right"
    );
  }

  // === Footer ===
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    "Thank you for shopping with us!",
    pageWidth / 2,
    summaryY + 20,
    null,
    null,
    "center"
  );

  // === Save PDF ===
  doc.save(`receipt_${Date.now()}.pdf`);
};
