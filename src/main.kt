// Created by Loris Witschard on 1/28/2018.

import org.w3c.dom.HTMLInputElement
import kotlin.browser.document
import kotlin.math.log2

fun main(args: Array<String>)
{
    listenInput("hamming-generator-input", { input -> generateHammingCode(input) })
    listenInput("hamming-check-input", { input -> checkHammingCode(input) })
}

fun generateHammingCode(input: String)
{
    val bits = stringToBits(input)
    val controlBitsCount = log2(bits.size.toDouble()).toInt()
    
    // génère le code de hamming
    
    for(bitIndex in (0..controlBitsCount).map { 1 shl it })
        bits.add(bitIndex - 1, false)
    
    for(bitIndex in (0..controlBitsCount).map { 1 shl it })
        bits[bitIndex - 1] = computeControlBit(bits, bitIndex)
    
    // affiche le code
    val result = StringBuilder()
    for((index, value) in bits.withIndex())
    {
        if(index != 0 && index % 4 == 0)
            result.append(' ')
        
        result.append(if(value) '1' else '0')
        
        if(index + 1 in (0..controlBitsCount).map { 1 shl it })
            result.append('!')
    }
    
    setText("hamming-generator-output", result.toString())
}

fun checkHammingCode(input: String)
{
    val bits = stringToBits(input)
    val controlBitsCount = log2(bits.size.toDouble()).toInt()
    
    // cherche la position de l'erreur
    var errorIndex = 0
    for(bitIndex in (0..controlBitsCount).map { 1 shl it })
        if(computeControlBit(bits, bitIndex))
            errorIndex += bitIndex
    
    // s'il y a trop d'erreurs
    if(errorIndex > bits.size)
    {
        setText("hamming-check-fix", "trop d'erreurs")
        setText("hamming-check-output", "")
        return
    }
    
    // s'il n'y a pas d'erreur
    if(errorIndex == 0)
        setText("hamming-check-fix", "pas d'erreur")
    
    // s'il y a une erreur
    else
    {
        // corrige le code
        bits[errorIndex - 1] = !bits[errorIndex - 1]
        
        // affiche le code corrigé
        val fixed = StringBuilder()
        for((index, value) in bits.withIndex())
        {
            if(index != 0 && index % 4 == 0)
                fixed.append(' ')
            
            fixed.append(if(value) '1' else '0')
            
            if(index + 1 == errorIndex)
                fixed.append('!')
            
            setText("hamming-check-fix", fixed.toString())
        }
    }
    
    // retrouve le message original
    for(bitIndex in (controlBitsCount downTo 0).map { 1 shl it })
        bits.removeAt(bitIndex - 1)
    
    val outputErrorIndex: Int?
    if(errorIndex in (0..controlBitsCount).map { 1 shl it })
        outputErrorIndex = null
    else
        outputErrorIndex = errorIndex - log2(errorIndex.toDouble()).toInt() - 2
    
    // affiche le mesage original
    val result = StringBuilder()
    for((index, value) in bits.withIndex())
    {
        if(index != 0 && index % 4 == 0)
            result.append(' ')
        
        result.append(if(value) '1' else '0')
        
        if(index == outputErrorIndex)
            result.append('!')
        
        setText("hamming-check-output", result.toString())
    }
}

fun computeControlBit(bits: List<Boolean>, bitIndex: Int): Boolean
{
    return bits
            .filterIndexed { index, b -> (index + 1) and bitIndex != 0 && b }
            .size and 1 == 1
}

fun stringToBits(input: String): MutableList<Boolean>
{
    val bits = mutableListOf<Boolean>()
    for(bit in input)
        if(bit in '0'..'1')
            bits.add(bit == '1')
    
    return bits
}

fun listenInput(id: String, callback: (input: String) -> Unit)
{
    val inputElement = document.getElementById(id) as HTMLInputElement
    inputElement.addEventListener("input", { callback(inputElement.value) })
}

fun setText(id: String, value: String)
{
    val formatted = value.replace(".!".toRegex()) { "<b>${it.value[0]}</b>" }
    document.getElementById(id)?.innerHTML = formatted
}
