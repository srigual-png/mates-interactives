$ErrorActionPreference = 'Stop'
$worksheet3Word = New-Object -ComObject Word.Application
$worksheet3Word.Visible = $false
$worksheet3Word.DisplayAlerts = 0
try {
    foreach ($worksheet3Path in (Get-ChildItem -LiteralPath (Join-Path $PWD 'output/fitxes-3eso') -Filter '*.docx')) {
        $worksheet3Doc = $worksheet3Word.Documents.Open($worksheet3Path.FullName, $false, $true)
        try {
            $worksheet3Doc.ExportAsFixedFormat((Join-Path $worksheet3Path.DirectoryName ($worksheet3Path.BaseName + '-word.pdf')),17)
        } finally { $worksheet3Doc.Close(0) }
    }
} finally { $worksheet3Word.Quit() }
