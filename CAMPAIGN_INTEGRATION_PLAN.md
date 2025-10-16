# Campaign Integration Plan - Create & Edit Functionality

## Overview

This document outlines the plan to integrate create and edit functionality for campaigns in the Dashboard page with a new simplified modal design.

## Current State Analysis

- **Current Modal**: Complex modal with multiple pool selectors and campaigns types
- **Current Data**: Mock data with multiple pools per campaign
- **Current Flow**: Basic CRUD operations with local state management

## New Requirements

### Data Structure

**New Campaign Object:**

```javascript
{
  "poolAddress": "0x0000000000000000000000000000000001000000_0x1EE68593CF10a8F11EB5Aaec4019bA2533aFac04",
  "bootstrappingEligible": true,
  "bootstrappingStartDate": "2024-01-15T00:00:00Z",
  "earlySznEligible": true,
  "earlySznStartDate": "2024-02-01T00:00:00Z",
  "memeSznEligible": true,
  "memeSznStartDate": "2024-03-01T00:00:00Z"
}
```

**Pool Dropdown Data:**

```javascript
[
  {
    poolAddress: "0x....",
    poolType: "volatile_stable",
    label: "REEF/USDC",
    token0Symbol: "REEF",
    token1Symbol: "USDC",
  },
];
```

## Implementation Plan

### Phase 1: API Service Updates

**File: `src/api/apiService.js`**

1. **Add getPools() method**

   - Endpoint: GET `/pools` (or appropriate endpoint)
   - Returns array of pool objects with poolAddress, label, token symbols

2. **Add createCampaign() method**

   - Endpoint: POST `/campaigns`
   - Payload: Single campaign object with pool address and seasons

3. **Update updateCampaign() method**
   - Endpoint: PUT `/campaigns/:id`
   - Payload: Updated campaign object

### Phase 2: Modal Component Redesign

**File: `src/components/Dashboard/CreateCampaignModal.jsx`**

**New Modal Structure:**

```
├── Modal Header
├── Pool Selection Dropdown
├── Season Configuration
│   ├── Bootstrapping Toggle + Date Input
│   ├── Early Season Toggle + Date Input
│   └── Meme Season Toggle + Date Input
├── Validation Messages
└── Action Buttons (Cancel/Save)
```

**Key Features:**

- Single pool dropdown (not multi-select)
- Three season toggles with conditional date inputs
- Real-time validation
- Support for both create and edit modes
- Loading states during API calls

### Phase 3: Dashboard Component Updates

**File: `src/pages/Dashboard.jsx`**

**Handler Updates:**

1. **handleCreateCampaign()**: Open modal in create mode
2. **handleEditCampaign(campaign)**: Open modal in edit mode with pre-filled data
3. **handleSaveCampaign(campaignData)**:
   - Create: Call API and add to local state
   - Edit: Call API and update local state
4. **handleDeleteCampaign(campaign)**: Delete campaign via API

### Phase 4: Validation Logic

**Validation Rules:**

- Pool selection is required
- At least one season must be enabled
- Start date is required for enabled seasons
- Start dates must be valid future dates
- Form submission only allowed when validation passes

### Phase 5: Error Handling & UX

- Loading states during API calls
- Error messages for API failures
- Success notifications
- Form reset after successful operations
- Proper modal cleanup on close

## Implementation Steps

### Step 1: Update API Service

```javascript
// Add to apiService.js
getPools: async () => {
  const response = await axios.get('/pools');
  return response.data;
},

createCampaign: async (campaignData) => {
  const response = await axios.post('/campaigns', campaignData);
  return response.data;
},

updateCampaign: async (id, campaignData) => {
  const response = await axios.put(`/campaigns/${id}`, campaignData);
  return response.data;
}
```

### Step 2: Create New Modal Component

- Remove complex pool selector components
- Add simple dropdown for pool selection
- Add three season toggle sections
- Implement conditional date inputs
- Add form validation
- Handle create/edit modes

### Step 3: Update Dashboard Handlers

- Fetch pools data on component mount
- Modify existing handlers for new data structure
- Add API integration for CRUD operations
- Handle loading and error states

### Step 4: Test Integration

- Test create functionality
- Test edit functionality
- Test validation scenarios
- Test error handling
- Test responsive design

## Files to Modify

1. **`src/api/apiService.js`** - Add new API methods
2. **`src/components/Dashboard/CreateCampaignModal.jsx`** - Complete redesign
3. **`src/pages/Dashboard.jsx`** - Update handlers and state management
4. **Optional**: Create separate validation utility if complex logic needed

## Benefits of New Design

1. **Simplified UX**: One pool per campaign, easier to understand
2. **Flexible Seasons**: Users can enable/disable seasons as needed
3. **Better Validation**: Clear requirements and error messages
4. **API Ready**: Matches backend data structure
5. **Maintainable**: Cleaner code structure for future updates

## Migration Notes

- Old mock data structure will need to be adapted
- Existing campaigns (if any) may need data migration
- UI components consuming campaign data may need updates
- Testing scenarios should cover both create and edit flows

## Success Criteria

- [x] Users can create campaigns with single pool selection
- [x] Users can enable/disable seasons with conditional dates
- [x] Users can edit existing campaigns
- [x] Form validation prevents invalid submissions
- [x] API integration works correctly
- [x] Error handling provides clear feedback
- [x] Modal works on both desktop and mobile
