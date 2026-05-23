$dataUrl = [System.IO.File]::ReadAllText('about2_b64.txt')

$html = [System.IO.File]::ReadAllText('protfolio.html')

# 1. Replace static img src
$html = [System.Text.RegularExpressions.Regex]::Replace(
    $html,
    'src="about2\.(png|jpg)(\?v=\d+)?"',
    "src=`"$dataUrl`""
)

# 2. Replace DEFAULT_PROFILE aboutImageUrl
$html = [System.Text.RegularExpressions.Regex]::Replace(
    $html,
    'aboutImageUrl: "about2\.(png|jpg)",',
    "aboutImageUrl: `"$dataUrl`","
)

# 3. Replace force-check comparison and assignment
$html = [System.Text.RegularExpressions.Regex]::Replace(
    $html,
    'profileData\.aboutImageUrl !== "about2\.(png|jpg)"',
    "profileData.aboutImageUrl !== `"$dataUrl`""
)
$html = [System.Text.RegularExpressions.Regex]::Replace(
    $html,
    'profileData\.aboutImageUrl = "about2\.(png|jpg)";',
    "profileData.aboutImageUrl = `"$dataUrl`";"
)

[System.IO.File]::WriteAllText('protfolio.html', $html)
Write-Output 'protfolio.html patched successfully'
