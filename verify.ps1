$matches = Select-String -Path 'index.html' -Pattern 'about-portrait' -SimpleMatch
foreach ($m in $matches) {
    $line = $m.Line
    $preview = $line.Substring(0, [Math]::Min(160, $line.Length))
    Write-Output $preview
    Write-Output "---"
}
