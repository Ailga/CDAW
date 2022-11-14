<?php
echo 'Hello World <br>';

function distance(string $strandA, string $strandB): int
{
    $lenA = strlen($strandA);
    $lenB = strlen($strandB);
    if ($lenA == $lenB){
        $Hamming =0; 
        for ($i = 0; $i <= $lenA-1; $i++) {
            if ($strandA[$i] != $strandB[$i]){
                echo $strandA[$i].$strandB[$i];
                $Hamming += 1;
            }
        return $Hamming;
        }
    }else{
        throw new \InvalidArgumentException("DNA strands must be of equal length.");
    }
    
}


echo distance('GCCTA','AGAGA');
?>

