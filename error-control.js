if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'error-control'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'error-control'.");
}
this['error-control'] = function (_, Kotlin) {
  'use strict';
  var Unit = Kotlin.kotlin.Unit;
  var numberToInt = Kotlin.numberToInt;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var StringBuilder = Kotlin.kotlin.text.StringBuilder;
  var withIndex = Kotlin.kotlin.collections.withIndex_7wnvza$;
  var downTo = Kotlin.kotlin.ranges.downTo_dqglrj$;
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  var CharRange = Kotlin.kotlin.ranges.CharRange;
  var unboxChar = Kotlin.unboxChar;
  var throwCCE = Kotlin.throwCCE;
  function main$lambda(input) {
    generateHammingCode(input);
    return Unit;
  }
  function main$lambda_0(input) {
    checkHammingCode(input);
    return Unit;
  }
  function main(args) {
    listenInput('hamming-generator-input', main$lambda);
    listenInput('hamming-check-input', main$lambda_0);
  }
  var Math_0 = Math;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function generateHammingCode(input) {
    var tmp$, tmp$_0, tmp$_1;
    var bits = stringToBits(input);
    var x = bits.size;
    var controlBitsCount = numberToInt(Math_0.log2(x));
    var $receiver = new IntRange(0, controlBitsCount);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_2;
    tmp$_2 = $receiver.iterator();
    while (tmp$_2.hasNext()) {
      var item = tmp$_2.next();
      destination.add_11rb$(1 << item);
    }
    tmp$ = destination.iterator();
    while (tmp$.hasNext()) {
      var bitIndex = tmp$.next();
      bits.add_wxm5ur$(bitIndex - 1 | 0, false);
    }
    var $receiver_0 = new IntRange(0, controlBitsCount);
    var destination_0 = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
    var tmp$_3;
    tmp$_3 = $receiver_0.iterator();
    while (tmp$_3.hasNext()) {
      var item_0 = tmp$_3.next();
      destination_0.add_11rb$(1 << item_0);
    }
    tmp$_0 = destination_0.iterator();
    while (tmp$_0.hasNext()) {
      var bitIndex_0 = tmp$_0.next();
      bits.set_wxm5ur$(bitIndex_0 - 1 | 0, computeControlBit(bits, bitIndex_0));
    }
    var result = new StringBuilder();
    tmp$_1 = withIndex(bits).iterator();
    while (tmp$_1.hasNext()) {
      var tmp$_4 = tmp$_1.next();
      var index = tmp$_4.component1()
      , value = tmp$_4.component2();
      if (index !== 0 && index % 4 === 0)
        result.append_s8itvh$(32);
      result.append_s8itvh$(value ? 49 : 48);
      var $receiver_1 = new IntRange(0, controlBitsCount);
      var destination_1 = ArrayList_init(collectionSizeOrDefault($receiver_1, 10));
      var tmp$_5;
      tmp$_5 = $receiver_1.iterator();
      while (tmp$_5.hasNext()) {
        var item_1 = tmp$_5.next();
        destination_1.add_11rb$(1 << item_1);
      }
      if (destination_1.contains_11rb$(index + 1 | 0))
        result.append_s8itvh$(33);
    }
    setText('hamming-generator-output', result.toString());
  }
  function checkHammingCode(input) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var bits = stringToBits(input);
    var x = bits.size;
    var controlBitsCount = numberToInt(Math_0.log2(x));
    var errorIndex = 0;
    var $receiver = new IntRange(0, controlBitsCount);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_3;
    tmp$_3 = $receiver.iterator();
    while (tmp$_3.hasNext()) {
      var item = tmp$_3.next();
      destination.add_11rb$(1 << item);
    }
    tmp$ = destination.iterator();
    while (tmp$.hasNext()) {
      var bitIndex = tmp$.next();
      if (computeControlBit(bits, bitIndex))
        errorIndex = errorIndex + bitIndex | 0;
    }
    if (errorIndex > bits.size) {
      setText('hamming-check-fix', "trop d'erreurs");
      setText('hamming-check-output', '');
      return;
    }
    if (errorIndex === 0)
      setText('hamming-check-fix', "pas d'erreur");
    else {
      bits.set_wxm5ur$(errorIndex - 1 | 0, !bits.get_za3lpa$(errorIndex - 1 | 0));
      var fixed = new StringBuilder();
      tmp$_0 = withIndex(bits).iterator();
      while (tmp$_0.hasNext()) {
        var tmp$_4 = tmp$_0.next();
        var index = tmp$_4.component1()
        , value = tmp$_4.component2();
        if (index !== 0 && index % 4 === 0)
          fixed.append_s8itvh$(32);
        fixed.append_s8itvh$(value ? 49 : 48);
        if ((index + 1 | 0) === errorIndex)
          fixed.append_s8itvh$(33);
        setText('hamming-check-fix', fixed.toString());
      }
    }
    var $receiver_0 = downTo(controlBitsCount, 0);
    var destination_0 = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
    var tmp$_5;
    tmp$_5 = $receiver_0.iterator();
    while (tmp$_5.hasNext()) {
      var item_0 = tmp$_5.next();
      destination_0.add_11rb$(1 << item_0);
    }
    tmp$_1 = destination_0.iterator();
    while (tmp$_1.hasNext()) {
      var bitIndex_0 = tmp$_1.next();
      bits.removeAt_za3lpa$(bitIndex_0 - 1 | 0);
    }
    var outputErrorIndex;
    var $receiver_1 = new IntRange(0, controlBitsCount);
    var destination_1 = ArrayList_init(collectionSizeOrDefault($receiver_1, 10));
    var tmp$_6;
    tmp$_6 = $receiver_1.iterator();
    while (tmp$_6.hasNext()) {
      var item_1 = tmp$_6.next();
      destination_1.add_11rb$(1 << item_1);
    }
    if (destination_1.contains_11rb$(errorIndex))
      outputErrorIndex = null;
    else {
      var tmp$_7 = errorIndex;
      var x_0 = errorIndex;
      outputErrorIndex = tmp$_7 - numberToInt(Math_0.log2(x_0)) - 2 | 0;
    }
    var result = new StringBuilder();
    tmp$_2 = withIndex(bits).iterator();
    while (tmp$_2.hasNext()) {
      var tmp$_8 = tmp$_2.next();
      var index_0 = tmp$_8.component1()
      , value_0 = tmp$_8.component2();
      if (index_0 !== 0 && index_0 % 4 === 0)
        result.append_s8itvh$(32);
      result.append_s8itvh$(value_0 ? 49 : 48);
      if (index_0 === outputErrorIndex)
        result.append_s8itvh$(33);
      setText('hamming-check-output', result.toString());
    }
  }
  function computeControlBit(bits, bitIndex) {
    var destination = ArrayList_init();
    var tmp$, tmp$_0;
    var index = 0;
    tmp$ = bits.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      if (((tmp$_0 = index, index = tmp$_0 + 1 | 0, tmp$_0) + 1 & bitIndex) !== 0 && item)
        destination.add_11rb$(item);
    }
    return (destination.size & 1) === 1;
  }
  function stringToBits(input) {
    var tmp$;
    var bits = ArrayList_init();
    tmp$ = iterator(input);
    while (tmp$.hasNext()) {
      var bit = unboxChar(tmp$.next());
      if ((new CharRange(48, 49)).contains_mef7kx$(bit))
        bits.add_11rb$(bit === 49);
    }
    return bits;
  }
  function listenInput$lambda(closure$callback, closure$inputElement) {
    return function (it) {
      closure$callback(closure$inputElement.value);
      return Unit;
    };
  }
  function listenInput(id, callback) {
    var tmp$;
    var inputElement = Kotlin.isType(tmp$ = document.getElementById(id), HTMLInputElement) ? tmp$ : throwCCE();
    inputElement.addEventListener('input', listenInput$lambda(callback, inputElement));
  }
  var Regex = Kotlin.kotlin.text.Regex_61zpoe$;
  var StringBuilder_init = Kotlin.kotlin.text.StringBuilder_init_za3lpa$;
  var throwNPE = Kotlin.throwNPE;
  function setText(id, value) {
    var tmp$;
    var regex = Regex('.!');
    var replace_20wsma$result;
    replace_20wsma$break: do {
      var match = regex.find_905azu$(value);
      if (match == null) {
        replace_20wsma$result = value.toString();
        break replace_20wsma$break;
      }
      var lastStart = 0;
      var length = value.length;
      var sb = StringBuilder_init(length);
      do {
        var foundMatch = match != null ? match : throwNPE();
        sb.append_ezbsdh$(value, lastStart, foundMatch.range.start);
        sb.append_gw00v9$('<b>' + String.fromCharCode(foundMatch.value.charCodeAt(0)) + '<\/b>');
        lastStart = foundMatch.range.endInclusive + 1 | 0;
        match = foundMatch.next();
      }
       while (lastStart < length && match != null);
      if (lastStart < length) {
        sb.append_ezbsdh$(value, lastStart, length);
      }
      replace_20wsma$result = sb.toString();
    }
     while (false);
    var formatted = replace_20wsma$result;
    (tmp$ = document.getElementById(id)) != null ? (tmp$.innerHTML = formatted) : null;
  }
  _.main_kand9s$ = main;
  _.generateHammingCode_61zpoe$ = generateHammingCode;
  _.checkHammingCode_61zpoe$ = checkHammingCode;
  _.computeControlBit_gqfale$ = computeControlBit;
  _.stringToBits_61zpoe$ = stringToBits;
  _.listenInput_hyc7mn$ = listenInput;
  _.setText_puj7f4$ = setText;
  main([]);
  Kotlin.defineModule('error-control', _);
  return _;
}(typeof this['error-control'] === 'undefined' ? {} : this['error-control'], kotlin);
