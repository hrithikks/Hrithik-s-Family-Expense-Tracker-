-- Keep the existing MILK responsibility, and add a separate category for packet milk.
INSERT INTO "Responsibility" ("id", "name", "description", "isActive", "createdAt", "updatedAt")
VALUES ('packet_milk_default', 'PACKET MILK', 'Packet milk purchases', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("name") DO NOTHING;

-- Assign the new category to Hrithik's seeded family account when that account exists.
INSERT INTO "UserResponsibility" ("id", "userId", "responsibilityId", "assignedAt")
SELECT 'assignment_packet_milk_hrithik', "User"."id", "Responsibility"."id", CURRENT_TIMESTAMP
FROM "User"
JOIN "Responsibility" ON "Responsibility"."name" = 'PACKET MILK'
WHERE "User"."email" = 'hrithik@family.local'
ON CONFLICT ("userId", "responsibilityId") DO NOTHING;
