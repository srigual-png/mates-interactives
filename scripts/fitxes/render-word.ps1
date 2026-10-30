# Verificació amb Word instal·lat: només obre les mostres en lectura.
$ErrorActionPreference = 'Stop'
$worksheetWord = New-Object -ComObject Word.Application
$worksheetWord.Visible = $false
$worksheetWord.DisplayAlerts = 0
try {
    $worksheetSamples = @('sheet.json', 'math-sheet.json') | ForEach-Object {
        $worksheetModel = Get-Content -LiteralPath (Join-Path $PWD ('tmp/fitxes/' + $_)) -Raw | ConvertFrom-Json
        $worksheetPrefix = if ($_ -eq 'math-sheet.json') { 'math-' } else { '' }
        foreach ($worksheetKind in @('fitxa', 'solucionari')) {
            Get-Item -LiteralPath (Join-Path $PWD ('tmp/fitxes/' + $worksheetPrefix + $worksheetKind + '-1eso-numeric-' + $worksheetModel.version + '.docx'))
        }
    }
    $worksheetSamples | ForEach-Object {
        $worksheetDocument = $worksheetWord.Documents.Open($_.FullName, $false, $true)
        try {
            $worksheetOutput = Join-Path $_.DirectoryName ($_.BaseName + '-word.pdf')
            $worksheetDocument.ExportAsFixedFormat($worksheetOutput, 17)
            Write-Output $worksheetOutput
        } finally { $worksheetDocument.Close(0) }
    }
} finally { $worksheetWord.Quit() }
