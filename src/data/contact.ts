export const contactAddress = "swardhan1@icloud.com";

export const contactTopics = [
  "Volume I · observation and method",
  "Volume II · institutions and power",
  "Volume III · work and social citizenship",
  "Volume IV · science and capability",
  "Public reading copy or correction",
  "Publication, documentary, or rights question",
  "Other Independent Observer question",
] as const;

export const contactPolicy = {
  maxNameLength: 120,
  maxEmailLength: 254,
  minMessageLength: 10,
  maxMessageLength: 5000,
} as const;

export type ContactTopic = (typeof contactTopics)[number];
