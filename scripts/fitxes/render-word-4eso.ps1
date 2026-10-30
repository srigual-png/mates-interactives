$ErrorActionPreference = 'Stop'
$worksheet4Word = New-Object -ComObject Word.Application
$worksheet4Word.Visible = $false
$worksheet4Word.DisplayAlerts = 0
try {
    foreach ($worksheet4Path in (Get-ChildItem -LiteralPath (Join-Path $PWD 'output/fitxes-4eso') -Filter '*.docx')) {
        $worksheet4Doc = $worksheet4Word.Documents.Open($worksheet4Path.FullName, $false, $true)
        try {
            $worksheet4Doc.ExportAsFixedFormat((Join-Path $worksheet4Path.DirectoryName ($worksheet4Path.BaseName + '-word.pdf')),17)
        } finally { $worksheet4Doc.Close(0) }
    }
} finally { $worksheet4Word.Quit() }
