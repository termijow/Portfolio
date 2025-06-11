// --- ARCHIVO: UtilitiesGAS.gs ---
// se generan los archivos del grafico de telaraña y envia el email

function generarGraficoYPdfGAS(etiquetas, valores, nombreEmpresa) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Usar un nombre de hoja temporal único para evitar colisiones si se ejecuta concurrentemente
  const tempSheetName = "GraficoTemp_" + nombreEmpresa.replace(/[^a-zA-Z0-9]/g, "_") + "_" + new Date().getTime();
  const hojaGraficoTemporal = ss.insertSheet(tempSheetName);

  try {
    const datosGrafico = etiquetas.map((etiqueta, i) => [etiqueta, valores[i] || 0]);

    hojaGraficoTemporal.getRange(1, 1).setValue("Categoría");
    hojaGraficoTemporal.getRange(1, 2).setValue("Valoración");

    if (datosGrafico.length > 0) {
        hojaGraficoTemporal.getRange(2, 1, datosGrafico.length, 2).setValues(datosGrafico);
    } else {
        hojaGraficoTemporal.getRange(2,1,1,2).setValues([["Sin Datos Suficientes", 0]]); // Placeholder
    }

    const rangoDatos = hojaGraficoTemporal.getRange(1, 1, Math.max(1, datosGrafico.length) + 1, 2);

    const grafico = hojaGraficoTemporal.newChart()
      .setChartType(Charts.ChartType.RADAR)
      .addRange(rangoDatos)
      .setPosition(1, 4, 0, 0)
      .setOption('title', `${CHART_TITLE_PREFIX_CONFIG} ${nombreEmpresa}`)
      .setOption('width', CHART_WIDTH_CONFIG)
      .setOption('height', CHART_HEIGHT_CONFIG)
      .setOption('legend', { position: 'none' }) // O 'right', 'top', etc. si lo deseas
      .setOption('vAxis', { minValue: CHART_V_AXIS_MIN_VALUE_CONFIG, maxValue: CHART_V_AXIS_MAX_VALUE_CONFIG })
      .setOption('colors', ['#3366CC']) // Puedes definir un color para el radar
      .build();
    
    hojaGraficoTemporal.insertChart(grafico);
    SpreadsheetApp.flush(); // Asegurar que los cambios se apliquen antes de continuar
    Utilities.sleep(3500); // Aumentar espera si el gráfico no se renderiza a tiempo

    const graficos = hojaGraficoTemporal.getCharts();
    if (graficos.length === 0) {
        Logger.log(`No se pudo generar el objeto Chart para ${nombreEmpresa} en hoja ${tempSheetName}.`);
        return null; // No se pudo crear el gráfico
    }
    const imagenGrafico = graficos[0].getAs('image/png');

    // Crear documento Google Docs para el PDF
    const docName = `Informe Temporal PDF ${nombreEmpresa.replace(/[^a-zA-Z0-9]/g, "_")} ${new Date().getTime()}`;
    const doc = DocumentApp.create(docName);
    const cuerpo = doc.getBody();
    
    if (COMPANY_LOGO_URL_CONFIG && COMPANY_LOGO_URL_CONFIG !== "URL_PUBLICA_DE_TU_LOGO_EMPRESA") {
      try {
        const logoBlob = UrlFetchApp.fetch(COMPANY_LOGO_URL_CONFIG).getBlob();
        // Añadir logo al inicio del documento
        cuerpo.insertImage(0, logoBlob).setWidth(150); // Ajusta tamaño
        cuerpo.insertParagraph(0, "").setSpacingAfter(12); // Espacio después del logo
      } catch (e) {
        Logger.log(`No se pudo cargar el logo desde ${COMPANY_LOGO_URL_CONFIG}: ${e.toString()}`);
      }
    }

    cuerpo.appendParagraph(`${CHART_TITLE_PREFIX_CONFIG} ${nombreEmpresa}`).setHeading(DocumentApp.ParagraphHeading.HEADING1).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    cuerpo.appendParagraph("\nEste gráfico representa tu madurez digital en las áreas clave evaluadas:\n").setAlignment(DocumentApp.HorizontalAlignment.CENTER);

    // cuerpo.appendImage(imagenGrafico).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    const parrafoConImagen = cuerpo.appendParagraph(''); // Crea un nuevo párrafo para la imagen
    parrafoConImagen.appendInlineImage(imagenGrafico);   // Inserta la imagen en ese párrafo
    parrafoConImagen.setAlignment(DocumentApp.HorizontalAlignment.CENTER); // Alinea el párrafo que contiene la imagen

    cuerpo.appendParagraph("\n\n\nEste informe personalizado fue generado por Andromeda Soluciones.").setItalic(true).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    cuerpo.appendParagraph("www.tu-sitio-web.com").setLinkUrl("https://www.tu-sitio-web.com").setAlignment(DocumentApp.HorizontalAlignment.CENTER); // Cambia esto

    doc.saveAndClose();
    
    const pdfBlob = DriveApp.getFileById(doc.getId()).getAs('application/pdf');
    const pdfName = `${PDF_FILENAME_PREFIX_CONFIG}${nombreEmpresa.replace(/[^a-zA-Z0-9\s]/g, "_")}_${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd")}.pdf`;
    pdfBlob.setName(pdfName);
    
    DriveApp.getFileById(doc.getId()).setTrashed(true); // Eliminar el Google Doc temporal
    
    return pdfBlob;

  } catch (e) {
    Logger.log(`Error en generarGraficoYPdfGAS para ${nombreEmpresa} (hoja ${tempSheetName}): ${e.toString()} Stack: ${e.stack}`);
    return null;
  } finally {
    // Siempre intentar eliminar la hoja temporal, incluso si hay errores
    try {
      ss.deleteSheet(hojaGraficoTemporal);
    } catch (errSheet) {
      Logger.log(`No se pudo eliminar la hoja temporal ${tempSheetName}: ${errSheet.toString()}`);
    }
  }
}

function enviarEmailConDiagnostico(clientEmail, nombreContacto, nombreEmpresa, pdfBlob, recomendacionesHtml) {
  // El PDFBlob es el gráfico de araña y el diagnóstico.
  // recomendacionesHtml es el string HTML con las recomendaciones personalizadas.

  const subject = `${EMAIL_SUBJECT_PREFIX_CONFIG} para ${nombreEmpresa}`;

  // URLs de imágenes (asegúrate de que sean públicas y correctas)
  const headerImageUrl = "https://webandromeda.com/wp-content/uploads/2022/11/Frame-23.png"; // Reemplaza si es necesario
  const signatureImageUrl = "URL_DE_TU_IMAGEN_DE_FIRMA_SI_ES_DIFERENTE"; // Si usas una firma específica en el footer. Tu HTML tiene una de Google.

  // Adaptación del HTML proporcionado para el cuerpo del email:
  // He añadido placeholders como {{NOMBRE_CONTACTO}}, {{NOMBRE_EMPRESA}}, y {{RECOMENDACIONES_PERSONALIZADAS}}
  // El placeholder {{PRODUCTOS}} lo he quitado ya que este email es para el diagnóstico, no una propuesta comercial directa.
  // Si necesitas incluir "productos" o "servicios", deberás pasar esa información a esta función.

  const emailBodyHtml = `
<div dir="ltr">
  <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="font-family:arial,'helvetica neue',helvetica,sans-serif;border-collapse:collapse;border-spacing:0px;width:600px">
    <tbody>
      <tr>
        <td align="left" bgcolor="#272343" style="padding:20px 20px 0px;background-color:rgb(39,35,67)">
          <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px">
            <tbody>
              <tr>
                <td valign="top" align="center" style="padding:0px;width:560px">
                  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                    <tbody>
                      <tr>
                        <td align="center" style="padding:0px;font-size:0px">
                          <img src="${headerImageUrl}" alt="Andromeda Soluciones Header" width="560" style="outline:none;display:block;border:0px; max-width:100%; height:auto;">
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0px"><a href="https://webandromeda.com/" style="color:rgb(44,181,67);font-size:14px" target="_blank"><br></a></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td align="left" bgcolor="#272343" style="padding:20px 20px 0px;background-color:rgb(39,35,67)">
          <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px">
            <tbody>
              <tr>
                <td valign="top" align="center" style="padding:0px;width:560px">
                  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                    <tbody>
                      <tr>
                        <td align="center" style="padding:0px">
                          <h1 style="margin:0px;line-height:36px;color:rgb(255,255,255)"><font size="4">Cordial Saludo ${nombreContacto || nombreEmpresa},</font></h1>
                          <div>
                            <div style="font-family:Arial,Helvetica,sans-serif">
                              <p><span style="color:rgb(255,255,255);font-size:14px">Gracias por completar nuestro Diagnóstico de Competitividad Digital.</span></p>
                              <p><span style="color:rgb(255,255,255);font-size:14px">Adjunto a este correo encontrarás un informe en PDF con tu gráfico de araña personalizado, el cual visualiza tu nivel actual en las áreas clave que hemos evaluado.</span></p>
                              <p><span style="color:rgb(255,255,255);font-size:14px">A continuación, te presentamos algunas recomendaciones basadas en tus respuestas:</span></p>
                            </div>
                            
                            <!-- SECCIÓN DE RECOMENDACIONES PERSONALIZADAS -->
                            <div style="font-family:Arial,Helvetica,sans-serif; color:rgb(255,255,255);font-size:14px; margin-top:15px; margin-bottom:15px; padding:15px; background-color:rgba(255,255,255,0.05); border-radius:5px;">
                              ${recomendacionesHtml}
                            </div>
                            <!-- FIN SECCIÓN DE RECOMENDACIONES -->

                            <div style="font-family:Arial,Helvetica,sans-serif">
                              <span style="color:rgb(255,255,255);font-size:14px">Esperamos que esta información te sea de utilidad. Nos encantaría conversar contigo sobre cómo Andromeda Soluciones puede ayudarte a implementar estas mejoras y potenciar tu negocio.</span>
                            </div>
                          </div>
                          <div style="font-family:Arial,Helvetica,sans-serif"><span style="color:rgb(255,255,255);font-size:14px"><br></span></div>
                          <div>
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="center" style="padding:0px"><h1 style="margin:0px;line-height:36px;font-weight:normal;color:rgb(255,255,255)"><strong><font size="6">¡Visita nuestro sitio web!</font></strong></h1></td>
                                </tr>
                                <tr>
                                  <td align="left" style="padding:0px"><p style="margin:0px;line-height:21px;color:rgb(255,255,255);font-size:14px"><br></p></td>
                                </tr>
                                <tr>
                                  <td align="center" style="padding:0px">
                                    <span style="border-style:solid;border-color:rgb(44,181,67);background:rgb(255,38,122);border-width:0px;display:inline-block;border-radius:30px;width:auto">
                                      <a href="https://webandromeda.com/" style="color:rgb(255,255,255);text-decoration-line:none;font-size:20px;border-style:solid;border-color:rgb(255,38,122);border-width:10px 60px;display:inline-block;background-image:initial;background-position:initial;background-size:initial;background-repeat:initial;background-origin:initial;background-clip:initial;border-radius:30px;font-weight:bold;line-height:24px;width:auto" target="_blank">Sitio web</a>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <h1 style="margin:0px;line-height:36px;font-weight:normal;color:rgb(255,255,255)"></h1>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="padding:0px"><p style="margin:0px;line-height:21px;color:rgb(255,255,255);font-size:14px"><br><br></p></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td align="left" bgcolor="#e9e6e6" style="padding:20px 20px 0px;background-color:rgb(233,230,230)">
          <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px">
            <tbody>
              <tr>
                <td valign="top" align="center" style="padding:0px;width:560px">
                  <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
                    <tbody>
                      <tr>
                        <td align="center" bgcolor="#e9e6e6" style="padding:0px">
                          <p style="margin:0px;line-height:21px;color:rgb(0,0,0);font-size:14px"><br>Enviado por el equipo de Andromeda Soluciones. Bogotá, Colombia.</p>
                          <p style="margin:0px;line-height:21px;color:rgb(0,0,0);font-size:14px">Este es un mensaje automatizado generado a partir de tu diagnóstico.</p>
                          <p style="margin:0px;line-height:21px;color:rgb(0,0,0);font-size:14px"><br></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <div><br></div>
  ${'' /* Si tienes una firma de Gmail separada que quieres incluir, puedes añadirla aquí,
         pero la que estaba en tu HTML original es una firma generada por Gmail y no se puede replicar tal cual.
         Mejor diseña una firma estática o no la incluyas si el footer ya tiene la info.
      <div dir="ltr" class="gmail_signature">...</div>
   */}
</div>
  `;

  try {
    MailApp.sendEmail({
      to: clientEmail,
      cc: INTERNAL_NOTIFICATION_EMAIL_CONFIG, // Usa la constante de Config.gs
      subject: subject,
      htmlBody: emailBodyHtml,
      name: EMAIL_SENDER_NAME_CONFIG, // Usa la constante de Config.gs
      attachments: [pdfBlob] // El PDF generado con el gráfico
    });
    Logger.log(`Email de diagnóstico enviado exitosamente a ${clientEmail} para la empresa ${nombreEmpresa}.`);
    return true;
  } catch (e) {
    Logger.log(`Error enviando email de diagnóstico a ${clientEmail} para ${nombreEmpresa}: ${e.toString()}`);
    return false;
  }
}