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
# ----------------------------------------------------


echo "🚀 Inizio processo di deploy per Volcanic Minds..."
echo "----------------------------------------------------"

# --- PASSO 0: CONTROLLO DEL BRANCH GIT ---
echo "🧐 Controllo del branch Git..."

# Recupera il nome del branch corrente
# Nota: `git branch --show-current` è più moderno. `git rev-parse --abbrev-ref HEAD` è più compatibile.
CURRENT_BRANCH=$(git branch --show-current)

# Controlla se siamo in un repository Git
if [ -z "$CURRENT_BRANCH" ]; then
    echo "❌ ERRORE: Nessun branch Git trovato. Assicurati di essere in un repository Git."
    exit 1
fi

# Confronta il branch corrente con il branch target
if [ "$CURRENT_BRANCH" != "$TARGET_BRANCH" ]; then
    echo "❌ DEPLOY ANNULLATO! Stai tentando di fare il deploy dal branch '$CURRENT_BRANCH'."
    echo "   Il deploy è consentito solo dal branch '$TARGET_BRANCH'."
    exit 1
else
    echo "✅ Corrispondenza branch confermata: sei su '$CURRENT_BRANCH'."
fi

echo "----------------------------------------------------"

# --- PASSO 1: SINCRONIZZAZIONE FILE SU S3 ---
echo "⏳ 1. Sincronizzazione file con il bucket s3://$BUCKET_NAME..."
aws s3 sync . s3://$BUCKET_NAME --delete

if [ $? -ne 0 ]; then
  echo "❌ ERRORE: La sincronizzazione con S3 è fallita. Deploy interrotto."
  exit 1
fi
echo "✅ Sincronizzazione completata con successo."
echo "----------------------------------------------------"


# --- PASSO 2: INVALIDAZIONE CACHE CLOUDFRONT ---
echo "⏳ 2. Invio richiesta di invalidazione cache per la distribuzione $DISTRIBUTION_ID..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

if [ $? -ne 0 ]; then
  echo "❌ ERRORE: La richiesta di invalidazione è fallita. Controlla la console AWS."
  exit 1
fi
echo "✅ Richiesta di invalidazione inviata con successo."
echo "----------------------------------------------------"

echo "🎉 DEPLOY COMPLETATO! Il sito sarà aggiornato a breve."