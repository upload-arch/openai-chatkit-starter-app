import type { ChatKitOptions } from "@openai/chatkit";

// Eski kodunuzdaki `WORKFLOW_ID` değişkenini buraya taşıdık
const WORKFLOW_ID = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";
// Eski kodunuzdaki `CREATE_SESSION_ENDPOINT` değişkenini buraya taşıdık
const CREATE_SESSION_ENDPOINT = "/api/create-session";

/**
 * ChatKit için tüm ayarları içeren ana yapılandırma objesi.
 * <ChatKitProvider options={chatKitOptions}> içinde kullanılır.
 */
export const chatKitOptions: ChatKitOptions = {
  // === API ve Çekirdek Ayarları ===
  api: {
    /**
     * Hangi ChatKit ajanının kullanılacağını belirler.
     * (Eski WORKFLOW_ID değişkeninizden alındı)
     */
    workflowId: WORKFLOW_ID,

    /**
     * Sohbet oturumunu başlatan sunucu adresiniz.
     * (Eski CREATE_SESSION_ENDPOINT değişkeninizden alındı)
     */
    createSession: CREATE_SESSION_ENDPOINT,

    /**
     * "composer.attachments.enabled = true" olduğu için eklendi.
     * Dosya yüklemelerinin ChatKit tarafından otomatik yönetilmesini sağlar.
     */
    uploads: "auto",
  },

  // === Tema ve Stil Ayarları (Yeni kodunuz) ===
  theme: {
    colorScheme: "dark",
    radius: "pill",
    density: "normal",
    color: {
      grayscale: {
        hue: 312,
        tint: 6,
      },
    },
    typography: {
      baseSize: 16,
      fontFamily:
        '"OpenAI Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
      fontFamilyMono:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace',
      fontSources: [
        {
          family: "OpenAI Sans",
          src: "https://cdn.openai.com/common/fonts/openai-sans/v2/OpenAISans-Regular.woff2",
          weight: 400,
          style: "normal",
          display: "swap",
        },
        // ... (diğer 7 font kaynağınız buraya eklenebilir)
      ],
    },
  },

  // === Yazı Yazma Alanı Ayarları (Yeni kodunuz) ===
  composer: {
    attachments: {
      enabled: true,
      maxCount: 5,
      maxSize: 10485760,
    },
    tools: [
      {
        id: "search_docs",
        label: "Search docs",
        shortLabel: "Docs",
        placeholderOverride: "Search documentation",
        icon: "book-open",
        pinned: false,
      },
      // ... (diğer 1 aracınız buraya eklenebilir)
    ],
  },

  // === Başlangıç Ekranı Ayarları (Yeni kodunuz) ===
  startScreen: {
    greeting: "", // Karşılama metni yok
    prompts: [
      {
        icon: "circle-question",
        label: "What is ChatKit?",
        prompt: "What is ChatKit?",
      },
      // ... (diğer 4 hazır sorunuz buraya eklenebilir)
    ],
  },

  // Diğer opsiyonel alanlar...
  // locale, initialThread, threadItemActions, header, onClientTool, entities, widgets
};

/**
 * Eğer bu değişkenlere başka dosyalarda (örn: Next.js API route)
 * ayrı olarak ihtiyacınız varsa, buradan export etmeye devam edebilirsiniz.
 * `chatKitOptions` objesi içinde zaten kullanıldılar.
 */
export { WORKFLOW_ID, CREATE_SESSION_ENDPOINT };
