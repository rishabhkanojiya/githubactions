#!/bin/bash

RES="false"
echo isCss $isCss
echo res $prodCss
if [ $isCss == 'true' ] && [ $prodCss != success ]; then
    RES="true"
elif [ $isImage == 'true' ] && [ $prodImages != success ]; then
    RES="true"
elif [ $isTrans == 'true' ] && [ $prodTranslations != success ]; then
    RES="true"
elif [ $isConfig == 'true' ] && [ $prodConfigs != success ]; then
    RES="true"
elif [ $isMain == 'true' ] && [ $prodJavascript != success ]; then
    RES="true"
else
    RES="false"
fi
echo "${RES}"
echo "::set-output name=hasProcessFailed::$RES"
