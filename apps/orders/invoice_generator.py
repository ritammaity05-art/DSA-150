import io
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_order_invoice_pdf(order):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    story = []
    styles = getSampleStyleSheet()

    # Custom Styles
    title_style = ParagraphStyle(
        'InvoiceTitle',
        parent=styles['Heading1'],
        fontSize=26,
        leading=30,
        textColor=colors.HexColor('#0f172a'),
        fontName='Helvetica-Bold'
    )
    subtitle_style = ParagraphStyle(
        'InvoiceSubTitle',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#64748b'),
        fontName='Helvetica'
    )
    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor('#1e293b')
    )

    # Header
    header_data = [
        [
            Paragraph("<b>TIN TUN STORE</b><br/><font size='9' color='#f59e0b'>Powered by Ritam</font>", title_style),
            Paragraph(f"<b>INVOICE</b><br/><font color='#64748b'>Order #{order.order_number}</font>", ParagraphStyle('RHeader', parent=subtitle_style, alignment=2, fontSize=12, leading=16))
        ],
        [
            Paragraph("Enterprise E-Commerce Platform<br/>Email: support@tintunstore.com", subtitle_style),
            Paragraph(f"<b>Date:</b> {order.created_at.strftime('%B %d, %Y')}<br/><b>Payment:</b> {order.payment_method} ({order.payment_status})", ParagraphStyle('RSubHeader', parent=subtitle_style, alignment=2))
        ]
    ]

    header_table = Table(header_data, colWidths=[270, 270])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 15))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#e2e8f0'), spaceAfter=15))

    # Shipping Address & Customer Details
    addr = order.shipping_address
    addr_str = f"<b>{addr.recipient_name}</b><br/>{addr.street_address}<br/>{addr.city}, {addr.state} {addr.postal_code}<br/>Phone: {addr.phone_number}" if addr else "N/A"

    info_data = [
        [Paragraph("<b>Billed & Shipped To:</b>", body_bold), Paragraph("<b>Order Summary:</b>", body_bold)],
        [Paragraph(addr_str, subtitle_style), Paragraph(f"Customer: {order.user.email}<br/>Order Status: <b>{order.order_status}</b>", subtitle_style)]
    ]
    info_table = Table(info_data, colWidths=[270, 270])
    info_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    story.append(info_table)
    story.append(Spacer(1, 20))

    # Items Table
    table_data = [
        [Paragraph("<b>Item Description</b>", body_bold), Paragraph("<b>SKU</b>", body_bold), Paragraph("<b>Qty</b>", body_bold), Paragraph("<b>Unit Price</b>", body_bold), Paragraph("<b>Total</b>", body_bold)]
    ]

    for item in order.items.all():
        table_data.append([
            Paragraph(item.product_name, subtitle_style),
            Paragraph(item.product_sku, subtitle_style),
            Paragraph(str(item.quantity), subtitle_style),
            Paragraph(f"${item.price:.2f}", subtitle_style),
            Paragraph(f"${item.total_price:.2f}", subtitle_style)
        ])

    items_table = Table(table_data, colWidths=[220, 90, 50, 90, 90])
    items_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f8fafc')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    story.append(items_table)
    story.append(Spacer(1, 15))

    # Totals Table
    totals_data = [
        [Paragraph("Subtotal:", subtitle_style), Paragraph(f"${order.subtotal:.2f}", body_bold)],
        [Paragraph("Discount:", subtitle_style), Paragraph(f"-${order.discount_amount:.2f}", subtitle_style)],
        [Paragraph("Tax (VAT):", subtitle_style), Paragraph(f"${order.tax_amount:.2f}", subtitle_style)],
        [Paragraph("Shipping Fee:", subtitle_style), Paragraph(f"${order.shipping_fee:.2f}", subtitle_style)],
        [Paragraph("<b>Grand Total:</b>", body_bold), Paragraph(f"<b>${order.grand_total:.2f}</b>", ParagraphStyle('GTotal', parent=body_bold, textColor=colors.HexColor('#2563eb'), fontSize=12))]
    ]
    totals_table = Table(totals_data, colWidths=[400, 140])
    totals_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(totals_table)
    story.append(Spacer(1, 30))

    # Footer
    footer_p = Paragraph("<font color='#94a3b8'>Thank you for shopping with Tin Tun Store (Powered by Ritam)! For inquiries, contact support@tintunstore.com.</font>", ParagraphStyle('Footer', parent=subtitle_style, alignment=1))
    story.append(footer_p)

    doc.build(story)
    buffer.seek(0)
    return buffer
