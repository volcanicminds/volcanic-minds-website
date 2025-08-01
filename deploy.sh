#!/bin/bash

# ==============================================================================
#  SCRIPT DI DEPLOY PER VOLCANIC MINDS WEBSITE
# ==============================================================================
#
#  Questo script esegue due azioni principali:
#  1. Controlla di essere sul branch 'main' prima di procedere.
#  2. Sincronizza i file locali con il bucket S3 di produzione.
#  3. Invalida la cache della distribuzione CloudFront per rendere
#     le modifiche immediatamente disponibili.
#
#  ATTENZIONE: rendere questo file eseguibile tramite chmod +x deploy.sh
#
# ==============================================================================

# --- CONFIGURAZIONE (variabili modificabili) ---
DISTRIBUTION_ID="E2D3SUEL8ZYRSP"
BUCKET_NAME="volcanic-minds-website-root"
TARGET_BRANCH="main"
BUILD_DIR="dist"
# --------------------


echo "🚀 Inizio processo di deploy per Volcanic Minds..."
echo "----------------------------------------------------"

# --- PASSO 0: CONTROLLO DEL BRANCH GIT ---
echo "🧐 Controllo del branch Git..."
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]; then
    echo "❌ DEPLOY ANNULLATO! Il deploy è consentito solo dal branch '$TARGET_BRANCH'."
    echo "   Branch corrente: '$CURRENT_BRANCH'."
    exit 1
fi
echo "✅ Sei sul branch corretto ('$CURRENT_BRANCH')."
echo "----------------------------------------------------"


# --- PASSO 1: BUILD DEL PROGETTO ---
echo "🛠️ 1. Esecuzione del build con 'yarn generate'..."
yarn generate

# Controlla il codice di uscita dell'ultimo comando. Se non è 0, c'è stato un errore.
if [ $? -ne 0 ]; then
  echo "❌ ERRORE: Il build del progetto ('yarn generate') è fallito. Deploy interrotto."
  exit 1
fi
echo "✅ Build completato con successo."
echo "----------------------------------------------------"


# --- PASSO 2: SINCRONIZZAZIONE FILE SU S3 ---
echo "⏳ 2. Sincronizzazione della cartella '$BUILD_DIR' con il bucket s3://$BUCKET_NAME..."
aws s3 sync ./$BUILD_DIR s3://$BUCKET_NAME --delete

if [ $? -ne 0 ]; then
  echo "❌ ERRORE: La sincronizzazione con S3 è fallita. Deploy interrotto."
  exit 1
fi
echo "✅ Sincronizzazione completata con successo."
echo "----------------------------------------------------"


# --- PASSO 3: INVALIDAZIONE CACHE CLOUDFRONT ---
echo "⏳ 3. Invio richiesta di invalidazione cache per la distribuzione $DISTRIBUTION_ID..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

if [ $? -ne 0 ]; then
  echo "❌ ERRORE: La richiesta di invalidazione è fallita. Controlla la console AWS."
  exit 1
fi
echo "✅ Richiesta di invalidazione inviata con successo."
echo "----------------------------------------------------"

echo "🎉 DEPLOY COMPLETATO! Il sito sarà aggiornato a breve."