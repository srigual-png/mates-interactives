$ErrorActionPreference = 'Stop'
$worksheet2Word = New-Object -ComObject Word.Application
$worksheet2Word.Visible = $false
$worksheet2Word.DisplayAlerts = 0
try {
    foreach ($worksheet2Path in (Get-ChildItem -LiteralPath (Join-Path $PWD 'output/fitxes-2eso') -Filter '*.docx')) {
        $worksheet2Doc = $worksheet2Word.Documents.Open($worksheet2Path.FullName, $false, $true)
        try {
            $worksheet2Doc.ExportAsFixedFormat((Join-Path $worksheet2Path.DirectoryName ($worksheet2Path.BaseName + '-word.pdf')),17)
        } finally { $worksheet2Doc.Close(0) }
    }
} finally { $worksheet2Word.Quit() }
