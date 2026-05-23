$bytes = [System.IO.File]::ReadAllBytes('about2.png')
$b64 = [Convert]::ToBase64String($bytes)
$dataUrl = 'data:image/png;base64,' + $b64
[System.IO.File]::WriteAllText('about2_b64.txt', $dataUrl)
Write-Output ('Done. Length: ' + $dataUrl.Length)
