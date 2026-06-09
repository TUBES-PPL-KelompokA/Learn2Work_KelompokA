<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Sertifikat Kelulusan - {{ $course_name }}</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            color: #1e293b;
        }
        .outer-border {
            position: absolute;
            top: 30px;
            left: 30px;
            right: 30px;
            bottom: 30px;
            border: 3px solid #0f172a;
            padding: 10px;
            background-color: #ffffff;
            box-sizing: border-box;
        }
        .inner-border {
            width: 100%;
            height: 100%;
            border: 1px solid #cbd5e1;
            position: relative;
            box-sizing: border-box;
            padding: 50px 60px;
            text-align: center;
        }
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 120px;
            color: rgba(241, 245, 249, 0.6);
            font-weight: bold;
            z-index: 1;
            letter-spacing: 10px;
        }
        .content {
            position: relative;
            z-index: 2;
        }
        .header {
            margin-bottom: 30px;
        }
        .logo-text {
            font-size: 24px;
            font-weight: bold;
            color: #4f46e5;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
        .title {
            font-size: 48px;
            font-weight: bold;
            color: #0f172a;
            margin: 15px 0 5px 0;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .subtitle {
            font-size: 14px;
            color: #64748b;
            letter-spacing: 4px;
            text-transform: uppercase;
        }
        .statement {
            margin-top: 50px;
            font-size: 16px;
            color: #475569;
        }
        .name {
            font-size: 40px;
            font-weight: bold;
            color: #4f46e5;
            margin: 20px 0;
            text-decoration: underline;
            font-family: Georgia, serif;
            font-style: italic;
        }
        .reason {
            font-size: 16px;
            color: #334155;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .course-name {
            font-size: 22px;
            font-weight: bold;
            color: #0f172a;
            margin-top: 10px;
        }
        .footer {
            margin-top: 80px;
            width: 100%;
            position: absolute;
            bottom: 50px;
            left: 0;
            padding: 0 80px;
            box-sizing: border-box;
        }
        .signature-block {
            float: right;
            text-align: center;
            width: 250px;
        }
        .signature-line {
            border-top: 1px solid #0f172a;
            margin-top: 50px;
            padding-top: 5px;
            font-weight: bold;
            font-size: 14px;
        }
        .signature-role {
            font-size: 12px;
            color: #64748b;
        }
        .meta-block {
            float: left;
            text-align: left;
            font-size: 12px;
            color: #94a3b8;
            line-height: 1.8;
            margin-top: 30px;
        }
        .badge {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 80px;
            background-color: #e0e7ff;
            border: 2px solid #4f46e5;
            border-radius: 50%;
            line-height: 80px;
            font-size: 32px;
            color: #4f46e5;
            font-weight: bold;
        }
        .clear {
            clear: both;
        }
    </style>
</head>
<body>

<div class="outer-border">
    <div class="inner-border">
        
        <div class="watermark">LEARN2WORK</div>

        <div class="content">
            <div class="header">
                <div class="logo-text">Learn2Work Platform</div>
                <div class="title">Sertifikat Kelulusan</div>
                <div class="subtitle">Certificate of Completion</div>
            </div>

            <div class="statement">
                Diberikan dengan penuh bangga kepada:
            </div>

            <div class="name">
                {{ $student_name }}
            </div>

            <div class="reason">
                Telah berhasil menyelesaikan seluruh rangkaian materi, evaluasi, dan kriteria kelulusan pada program pembelajaran:
                <div class="course-name">{{ $course_name }}</div>
            </div>
        </div>

        <div class="footer">
            <div class="meta-block">
                <strong>ID Sertifikat:</strong> {{ $certificate_id }}<br>
                <strong>Tanggal Kelulusan:</strong> {{ $completion_date }}<br>
                <span style="font-size: 10px; color: #cbd5e1;">Verifikasi resmi terdaftar di sistem Learn2Work</span>
            </div>

            <div class="signature-block">
                <div style="font-family: 'Courier New', Courier, monospace; font-size: 20px; color: #4f46e5; font-style: italic; margin-bottom: -10px;">
                    Approved
                </div>
                <div class="signature-line">
                    Direktur Pembelajaran
                </div>
                <div class="signature-role">
                    Learn2Work Indonesia
                </div>
            </div>
            <div class="clear"></div>
        </div>

        <div class="badge">★</div>

    </div>
</div>

</body>
</html>
