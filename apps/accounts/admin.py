from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Address

class AddressInline(admin.TabularInline):
    model = Address
    extra = 1

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'username', 'role', 'is_email_verified', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('role', 'is_email_verified', 'is_staff', 'is_active')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Custom Profile Info', {'fields': ('role', 'phone_number', 'profile_picture', 'bio', 'is_email_verified')}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Custom Profile Info', {'fields': ('email', 'role', 'phone_number')}),
    )
    inlines = [AddressInline]
    search_fields = ('email', 'username', 'first_name', 'last_name', 'phone_number')
    ordering = ('-date_joined',)

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('recipient_name', 'user', 'address_type', 'city', 'state', 'postal_code', 'is_default')
    list_filter = ('address_type', 'is_default', 'country')
    search_fields = ('recipient_name', 'user__email', 'street_address', 'city')
