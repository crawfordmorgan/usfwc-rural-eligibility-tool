let table = base.getTable("Participants");
let view = table.getView("Rural Lookup Pending");
let queryResult = await view.selectRecordsAsync({ fields: ["Postal Code"] });
let ruralCheckbox = 'Rural Zip Code';
let ruralLookupDate = 'Rural Lookup';

let ruralZipCodesUrl = 'https://raw.githubusercontent.com/crawfordmorgan/usfwc-rural-eligibility-tool/refs/heads/main/usda-eligible-zips';
let ruralZipCodesResponse = await fetch(ruralZipCodesUrl);
let ruralZipCodesText = await ruralZipCodesResponse.text();
let ruralZipSet = new Set(ruralZipCodesText.split(/\r?\n/));

let now = new Date().toISOString();
let updates = [];

for (let record of queryResult.records) {
    let postalCode = record.getCellValue("Postal Code");
    let updateFields = { [ruralLookupDate]: now };

    if (ruralZipSet.has(postalCode)) {
        updateFields[ruralCheckbox] = true;
    }

    updates.push({ id: record.id, fields: updateFields });

    if (updates.length === 50) {
        await table.updateRecordsAsync(updates);
        updates = [];
    }
}

if (updates.length > 0) {
    await table.updateRecordsAsync(updates);
}
