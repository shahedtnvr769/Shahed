$dataUrl = [System.IO.File]::ReadAllText('about2_b64.txt')

$html = [System.IO.File]::ReadAllText('index.html')

# 1. Replace static img src (handles ?v=2 or no version)
$html = [System.Text.RegularExpressions.Regex]::Replace(
    $html,
    'src="about2\.png(\?v=\d+)?"',
    "src=`"$dataUrl`""
)

# 2. Replace DEFAULT_PROFILE aboutImageUrl
$html = $html.Replace(
    "aboutImageUrl: `"about2.png`",",
    "aboutImageUrl: `"$dataUrl`","
)

# 3. Replace force-check comparison and assignment (both about2.png and about2.jpg)
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

# 4. Replace saveAdminProfile hardcoded value
$html = [System.Text.RegularExpressions.Regex]::Replace(
    $html,
    'aboutImageUrl: "about2\.(png|jpg)",',
    "aboutImageUrl: `"$dataUrl`","
)

[System.IO.File]::WriteAllText('index.html', $html)
Write-Output 'index.html patched successfully'
