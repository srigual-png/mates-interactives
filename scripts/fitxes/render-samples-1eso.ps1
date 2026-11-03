# Render QA amb Word instal·lat, en lectura; no modifica els DOCX.
$ErrorActionPreference = 'Stop'
$worksheetRenderFolder = Join-Path $PWD 'tmp/fitxes/render-comparables'
New-Item -ItemType Directory -Force -Path $worksheetRenderFolder | Out-Null
$worksheetSamples = Get-Content -LiteralPath 'output/fitxes-revisio-1eso/manifest.json' -Raw | ConvertFrom-Json
$worksheetWord = New-Object -ComObject Word.Application
$worksheetWord.Visible = $false
$worksheetWord.DisplayAlerts = 0
try {
    foreach ($worksheetSample in $worksheetSamples) {
        foreach ($worksheetName in $worksheetSample.files) {
            if (!$worksheetName.EndsWith('.docx')) { continue }
            $worksheetInput = (Resolve-Path -LiteralPath (Join-Path 'output/fitxes-revisio-1eso' $worksheetName)).Path
            $worksheetDocument = $worksheetWord.Documents.Open($worksheetInput, $false, $true)
            try {
                $worksheetPdf = Join-Path $worksheetRenderFolder ([IO.Path]::GetFileNameWithoutExtension($worksheetName) + '-word.pdf')
                $worksheetDocument.ExportAsFixedFormat($worksheetPdf, 17)
                Write-Output $worksheetPdf
            } finally { $worksheetDocument.Close(0) }
        }
    }
} finally { $worksheetWord.Quit() }
